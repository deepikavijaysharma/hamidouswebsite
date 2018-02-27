define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojradioset', 'ojs/ojbutton','ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojtagcloud', 'ojs/ojtoolbar','ojs/ojchart'], function (oj, ko, $) {

  function tabmodel() {
    var self = this;
      self.period = ko.observable(["0"]);
	   self.formState = ko.observable('enabled');
	   
	   
	    self.disableFormControls = ko.computed(function () {
		  
              if (self.period() == '-1')
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
    var course_enrollment_trend_url=analytics_report_base_url+"ENROLLMENTS_TOP5/";


    // BAR GRAPH DATA
    
    self.stackValue = ko.observable('off');
    self.orientationValue = ko.observable('vertical');
    self.locationValue = ko.observable('back');
    self.refObjTypeValue = ko.observable('line');
    self.refObjItemsTypeValue = ko.observable('constant');
    self.axisValue = ko.observable('yAxis');
    self.barSeriesValue = ko.observableArray([]);
    self.barGroupsValue = ko.observableArray([]);

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

      var url=total_visitor_url;

      // ADD PERIOD IF SELECTED
      url+=period.length>0?period+"/":"$-$/";

      // ADD START DATE IF SELECTED
      url+=startdate.length>0?startdate+"/":"$-$/";

      // ADD END DATE IF SELECTED
      url+=enddate.length>0?enddate:"$-$";

      $
        .getJSON(url)
        .then(function (data) {
          self.total_visitor(data.items[0].count);
        });
    }

    // GET NEW VISITOR COUNT
    async function getNewVisitorCount(period,startdate,enddate) {

      var url=total_new_visitor_url;
      
       // ADD PERIOD IF SELECTED
       url+=period.length>0?period+"/":"$-$/";

       // ADD START DATE IF SELECTED
       url+=startdate.length>0?startdate+"/":"$-$/";
 
       // ADD END DATE IF SELECTED
       url+=enddate.length>0?enddate:"$-$";

      $
        .getJSON(url)
        .then(function (data) {
          self.total_unique_visitor(data.items[0].count);
        });
    }

    // GET NEW VISITOR COUNT
    async function getReturningVisitorCount(period,startdate,enddate) {

      var url=total_returning_visitor_url;


       // ADD PERIOD IF SELECTED
       url+=period.length>0?period+"/":"$-$/";

       // ADD START DATE IF SELECTED
       url+=startdate.length>0?startdate+"/":"$-$/";
 
       // ADD END DATE IF SELECTED
       url+=enddate.length>0?enddate:"$-$";

      $
        .getJSON(url)
        .then(function (data) {
          self.total_returning_visitor(data.items[0].count);
        });
    }

    // GET NEW VISITOR COUNT
    async function getCourseEnrollmentCount(period,startdate,enddate) {

      var url=total_course_enrollment_url;

       // ADD PERIOD IF SELECTED
       url+=period.length>0?period+"/":"$-$/";

       // ADD START DATE IF SELECTED
       url+=startdate.length>0?startdate+"/":"$-$/";
 
       // ADD END DATE IF SELECTED
       url+=enddate.length>0?enddate:"$-$";


      $
        .getJSON(url)
        .then(function (data) {
          self.total_course_registration(data.items[0].count);
        });
    }


    async function getCourseEnrollmentTremd(period,startdate,enddate){
      var url=course_enrollment_trend_url;

      // ADD PERIOD IF SELECTED
      url+=period.length>0?period+"/":"$-$/";

      // ADD START DATE IF SELECTED
      url+=startdate.length>0?startdate+"/":"$-$/";

      // ADD END DATE IF SELECTED
      url+=enddate.length>0?enddate:"$-$";

      $
              .getJSON(url)
              .then(function (data) {
                console.log(data.items);
                var countval=new Array();
                self.barGroupsValue([]);
                self.barSeriesValue([]);
                for(var i=0;i<data.items.length;i++){
                  countval.push(data.items[i].count);
                  self.barGroupsValue.push(data.items[i].name);
                }

                self.barSeriesValue.push({
                  name:"Courses",
                  items:countval
                })
              });

    }

    // Load all data once page is loaded
    self.handleActivated = function (info) {
      getTotalVisitorCount("Week","","");
      getNewVisitorCount("Week","","");
      getReturningVisitorCount("Week","","");
      getCourseEnrollmentCount("Week","","");
      getCourseEnrollmentTremd("Week","","");
    }
    

    // Filter Button Handler
    applyFilter=function(){

      if(new Date(self.start_date())>=new Date(self.end_date())){
          alert("End Date should be greater than Start Date");
          return;
      }
      
      var period=self.period()!='-1'?self.period():"";
      var startdate=self.period()!='-1'?"":getDateString(new Date(self.start_date()));
      var enddate=self.period()!='-1'?"":getDateString(new Date(self.end_date()));

      console.log('Start: '+startdate);
      console.log('End: '+enddate);
      console.log('Period: '+period);


      getTotalVisitorCount(period,startdate,enddate);
      getNewVisitorCount(period,startdate,enddate);
      getReturningVisitorCount(period,startdate,enddate);
      getCourseEnrollmentCount(period,startdate,enddate);
      getCourseEnrollmentTremd(period,startdate,enddate);
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
          
  }
  return new tabmodel();
});
