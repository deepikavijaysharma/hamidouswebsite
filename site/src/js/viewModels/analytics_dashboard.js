define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojradioset', 'ojs/ojbutton','ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojtagcloud', 'ojs/ojtoolbar','ojs/ojchart'], function (oj, ko, $) {

  function tabmodel() {
    var self = this;
 self.val = ko.observable(["tod"]);
	   self.formState = ko.observable('enabled');
	   
	   
	    self.disableFormControls = ko.computed(function () {
		  
              if (self.val() == 'CR')
                return false;
              else
               return true;
            });

    // Filter Variables
    self.start_date=ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(Date.now())));
    self.end_date=ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(Date.now())));
	self.value = ko.observable(); 
    var today=new Date(Date.now());
    self.mindate=ko.observable("2018-02-24");

    // Row One Variables
    self.total_visitor = ko.observable(0);
    self.total_unique_visitor = ko.observable(0);
    self.total_returning_visitor = ko.observable(0);
    self.total_course_registration = ko.observable(0);

    var total_visitor_url = analytics_report_base_url + "VISITS/"; ///$-$/01-jan-2018/01-mar-2018"
    var total_new_visitor_url = analytics_report_base_url + "UNIQ_USERS/";//$-$/01-jan-2018/01-mar-2018";
    var total_returning_visitor_url = analytics_report_base_url + "RETURNING_USERS/";//$-$/01-jan-2018/01-mar-2018";
    var total_course_enrollment_url = analytics_report_base_url + "ENROLLMENTS/";//$-$/01-jan-2018/01-mar-2018";


    console.log("Min date: "+self.mindate());

    // CONVERTS ANY DATE OBJECT INTO dd-MMM-yyyy format
    getDateString=function(date){
		
      var day_of_the_date=date.toDateString().split(' ')[2];
      var month_of_the_date=date.toDateString().split(' ')[1].toLowerCase();
      var year_of_the_date=date.toDateString().split(' ')[3];
      return day_of_the_date+"-"+month_of_the_date+"-"+year_of_the_date;
    }

    
    // GET TOTAL VISITOR COUNT
    async function getTotalVisitorCount(period,startdate,enddate) {

      // ADD PERIOD IF SELECTED
      total_visitor_url+=period.length>0?period+"/":"$-$/";

      // ADD START DATE IF SELECTED
      total_visitor_url+=startdate.length>0?startdate+"/":"$-$/";

      // ADD END DATE IF SELECTED
      total_visitor_url+=enddate.length>0?enddate:"$-$";

      $
        .getJSON(total_visitor_url)
        .then(function (data) {
          self.total_visitor(data.items[0].count);
        });
    }

    // GET NEW VISITOR COUNT
    async function getNewVisitorCount(period,startdate,enddate) {

       // ADD PERIOD IF SELECTED
       total_new_visitor_url+=period.length>0?period+"/":"$-$/";

       // ADD START DATE IF SELECTED
       total_new_visitor_url+=startdate.length>0?startdate+"/":"$-$/";
 
       // ADD END DATE IF SELECTED
       total_new_visitor_url+=enddate.length>0?enddate:"$-$";

      $
        .getJSON(total_new_visitor_url)
        .then(function (data) {
          self.total_unique_visitor(data.items[0].count);
        });
    }

    // GET NEW VISITOR COUNT
    async function getReturningVisitorCount(period,startdate,enddate) {

       // ADD PERIOD IF SELECTED
       total_returning_visitor_url+=period.length>0?period+"/":"$-$/";

       // ADD START DATE IF SELECTED
       total_returning_visitor_url+=startdate.length>0?startdate+"/":"$-$/";
 
       // ADD END DATE IF SELECTED
       total_returning_visitor_url+=enddate.length>0?enddate:"$-$";

      $
        .getJSON(total_returning_visitor_url)
        .then(function (data) {
          self.total_returning_visitor(data.items[0].count);
        });
    }

    // GET NEW VISITOR COUNT
    async function getCourseEnrollmentCount(period,startdate,enddate) {

       // ADD PERIOD IF SELECTED
       total_course_enrollment_url+=period.length>0?period+"/":"$-$/";

       // ADD START DATE IF SELECTED
       total_course_enrollment_url+=startdate.length>0?startdate+"/":"$-$/";
 
       // ADD END DATE IF SELECTED
       total_course_enrollment_url+=enddate.length>0?enddate:"$-$";


      $
        .getJSON(total_course_enrollment_url)
        .then(function (data) {
          self.total_course_registration(data.items[0].count);
        });
    }
    // Load all data once page is loaded
    self.handleActivated = function (info) {
      getTotalVisitorCount("","01-jan-2018","01-mar-2018");
      getNewVisitorCount("","01-jan-2018","01-mar-2018");
      getReturningVisitorCount("","01-jan-2018","01-mar-2018");
      getCourseEnrollmentCount("","01-jan-2018","01-mar-2018");
    }

    // Filter Button Handler
    applyFilter=function(){
      console.log(getDateString(new Date(self.start_date())));
    }
	
	
			
	//TAG CLOUD START
	
	 self.tags = [];
      var socialNetworks = [
  {
    "id": "Facebook",
    "14-17": 63.7,
    "18-34": 83.2,
    "35-54": 74.1,
    "total": 76.8,
    "url": "https://www.facebook.com"
  },
  {
    "id": "YouTube",
    "14-17": 81.9,
    "18-34": 77.6,
    "35-54": 54.2,
    "total": 66.4,
    "url": "https://www.youtube.com"
  },
  {
    "id": "Twitter",
    "14-17": 31,
    "18-34": 38.7,
    "35-54": 28.3,
    "total": 32.8,
    "url": "https://twitter.com"
  },
  {
    "id": "Instagram",
    "14-17": 56.4,
    "18-34": 37.2,
    "35-54": 16,
    "total": 28.5,
    "url": "https://instagram.com"
  },
  {
    "id": "Google+",
    "14-17": 24.6,
    "18-34": 25,
    "35-54": 20,
    "total": 22.7,
    "url": "https://plus.google.com"
  },
  {
    "id": "LinkedIn",
    "14-17": 1.5,
    "18-34": 15.9,
    "35-54": 20,
    "total": 16.6,
    "url": "https://www.linkedin.com"
  },
  {
    "id": "SnapChat",
    "14-17": 36.8,
    "18-34": 21.1,
    "35-54": 4.2,
    "total": 14.2,
    "url": "https://www.snapchat.com"
  },
  {
    "id": "Tumblr",
    "14-17": 23.8,
    "18-34": 15.6,
    "35-54": 5.7,
    "total": 11.5,
    "url": "https://www.tumblr.com"
  },
  {
    "id": "Vine",
    "14-17": 31.8,
    "18-34": 15.5,
    "35-54": 3.5,
    "total": 11.1,
    "url": "https://vine.co"
  },
  {
    "id": "WhatsApp",
    "14-17": 8,
    "18-34": 9.8,
    "35-54": 4,
    "total": 6.8,
    "url": "https://www.whatsapp.com"
  },
  {
    "id": "reddit",
    "14-17": 8,
    "18-34": 8.5,
    "35-54": 3.9,
    "total": 6.2,
    "url": "https://www.reddit.com"
  },
  {
    "id": "Flickr",
    "14-17": 3.6,
    "18-34": 3.9,
    "35-54": 6.9,
    "total": 5.4,
    "url": "https://www.flickr.com"
  },
  {
    "id": "Pinterest",
    "14-17": 3.6,
    "18-34": 2,
    "35-54": 0.6,
    "total": 1.5,
    "url": "https://www.pintrest.com"
  }
];

 for (var i=0; i<socialNetworks.length; i++) {
        var network = socialNetworks[i];
        self.tags.push({
          id: network['id'],
          label: network['id'],
          value: network['total'],
          shortDesc: network['id']+': '+network['total']+'% of respondents'
        });
      }	
	  
	 //TAG CLOUD END 	
	 
	 //BAR GRAPH START 
	 /* toggle button variables */
        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');
        
        /* chart data */
        var barSeries = [{name: "Series 1", items: [42, 34]},
                         {name: "Series 2", items: [55, 30]},
                         {name: "Series 3", items: [36, 50]},
                         {name: "Series 4", items: [22, 46]},
                         {name: "Series 5", items: [22, 46]}];
    
        var barGroups = ["Group A", "Group B"];
   
        self.barSeriesValue = ko.observableArray(barSeries);
        self.barGroupsValue = ko.observableArray(barGroups);
        
        /* toggle buttons*/
        self.stackOptions = [
            {id: 'unstacked', label: 'unstacked', value: 'off', icon: 'oj-icon demo-bar-unstack'},
            {id: 'stacked', label: 'stacked', value: 'on', icon: 'oj-icon demo-bar-stack'}
        ];
        self.orientationOptions = [
            {id: 'vertical', label: 'vertical', value: 'vertical', icon: 'oj-icon demo-bar-vert'},
            {id: 'horizontal', label: 'horizontal', value: 'horizontal', icon: 'oj-icon demo-bar-horiz'}
        ];
	 
	 
	 
	 //BAR GRAPH END 
          
  }
  return new tabmodel();
});