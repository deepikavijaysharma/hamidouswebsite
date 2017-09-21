/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojcollapsible', 'ojs/ojanimation', 'ojs/ojchart', 'ojs/ojselectcombobox', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojdialog','ojs/ojdatetimepicker', 'ojs/ojtimezonedata'],
    function(oj, ko, $) {

        function DashboardViewModel() {


            var self = this;
			this.val = ko.observableArray();
			/*---------------------------------ADMIN----------------------------------*/
// CREATE COURSE
      self.coursetitle = ko.observable('');
      self.courselink = ko.observable('');
      self.coursedesc = ko.observable('');

      self.selectedrole = ko.observable('');
      self.selectedcategory = ko.observable('');
      self.selectedsubcategory = ko.observable('');

      self.roles = ko.observableArray([]);
      self.categories = ko.observableArray([]);
      self.subcategories = ko.observableArray([]);
            // category count
            self.catcnt = ko.observableArray([]);
      self.rolebasedcategory = ko.observableArray([]);
      self.categorybasedsubcategory = ko.observableArray([]);
      self.isAdvanced = ko.observableArray([]);

      // complexity count
      self.comcnt = ko.observableArray([]);
      // CREATE CATEGORY
      self.role = ko.observable('');
      self.category = ko.observable('');
      self.subcategory = ko.observable('');

      // CREATE COMMUNITY CALL
      self.calltitle = ko.observable('');
      self.callspkr = ko.observable('');
      self.calldesignation = ko.observable('');
      self.value = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
      self.callsdate = ko.observable('');
      self.calltime = ko.observable('');
      self.callvenue = ko.observable('');
      self.calllink = ko.observable('');
      self.calldialin = ko.observable('');
      self.calldesc = ko.observable('');






      // EVENT HANDLER FOR ROLE SELECTION
      rolesselected = function (event, ui) {
        populateCategory(ui.value);
      }

      //EVENT HANDLE FOR CATEGORY SELECTION
      categorySelected = function (event, ui) {
        populateSubcategory(ui.value);
      }

      // POPULLATE CATEGORY BASED ON ROLE
      populateCategory = function (role) {
        self.selectedcategory('');
        self.rolebasedcategory([]);
        self.categorybasedsubcategory([]);
        for (var i = 0; i < self.categories().length; i++) {
          var category = self.categories()[i];
          if (category.parent == role) {
            self.rolebasedcategory().push(category);
          }
        }
      }

      // POPULATE SUBCATEGORY BASED ON CATEGORY
      populateSubcategory = function (role) {
        self.categorybasedsubcategory([]);
        for (var i = 0; i < self.subcategories().length; i++) {
          var subcategory = self.subcategories()[i];
          if (subcategory.parent == role) {
            self.categorybasedsubcategory().push(subcategory);
          }
        }
      }

 //-----------------   COMMUNITY CALL   ------------------------//
      this.patternValue = ko.observableArray(["dd-MMM-yy hh:mm:ss a Z"]);
      this.dateTimeConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
      createConverter({
        pattern: "dd-MMM-yy hh:mm:ss a Z"
      });
      self.callname = ko.observable('');
      self.callspkr = ko.observable('');
      self.calldesignation = ko.observable('');
      self.value = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
      self.callsdate = ko.observable('');
      self.calltime = ko.observable('');
      self.callvenue = ko.observable('');
      self.calllink = ko.observable('');
      self.calldialin = ko.observable('');
      self.calldesc = ko.observable('');

      resetcall = function () {
        self.callname('');
        self.callspkr('');
        self.calldesignation('');
        self.value(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.callsdate('');
        self.calltime('');
        self.callvenue('');
        self.calllink('');
        self.calldialin('');
        self.calldesc('');
      }			
			
// CREATE COMMUNITY CALL
      createcommunitycall = function () {

        if (self.calltitle().length == 0) {
          alert("Please enter Title");
          return;
        }

        if (self.callspkr().length == 0) {
          alert("Please enter name of the speaker");
          return;
        }

        if (self.calldesignation().length == 0) {

          alert("Please enter designation of the speaker");
          return;
        }

        if (self.callvenue().length == 0) {

          alert("Please enter venue details");
          return;
        }

        if (self.calllink().length == 0) {

          alert("Please enter meeting link");
          return;
        }

        if (self.calldialin().length == 0) {

          alert("Please enter Dial In details");
          return;
        }

        if (self.calldesc().length == 0) {

          alert("Please enter description");
          return;
        }

        var call = {
          name: self.callname(),
          speaker: self.callspkr(),
          title: self.calldesignation(),
          call_date: self.value().split('T')[0],
          call_time: self.value().split('T')[1],
          locn: self.callvenue(),
          meetinglink: self.calllink(),
          dialin: self.calldialin(),
          description: self.calldesc(),
          user: "angan.sen@oracle.com"
        }

        console.log(ko.toJSON(call));
        var url = 'http://10.146.89.49:7003/ords/seaashm/seaashm/INS_COMMUNITY_CALLS';

        $.ajax({
          url: url,
          cache: false,
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: ko.toJSON(call),
          success: function (data) {
            resetcall();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
        });


      }

      //----------------------- END OF COMMUNITY CALL  ---------------------//
	  //------------------   CATEGORY  -------------------//


      // GET THE CATEGORIES
      getcategories = function () {
        $.getJSON("https://apex.oraclecorp.com/pls/apex/se_cloud_ready_training/training/getCategories").
        then(function (reasons) {
          self.categories([]);
          self.subcategories([]);
          self.roles([]);
          var currentroles = reasons.roles;

          for (var i = 0; i < currentroles.length; i++) {
            var role = {
              value: currentroles[i].name,
              label: currentroles[i].name
            }
            var categories = currentroles[i].Suites;
            for (var j = 0; j < categories.length; j++) {
              var category = {
                parent: currentroles[i].name,
                value: categories[j].name,
                label: categories[j].name
              }
              var subcategories = categories[j].Services;
              for (var k = 0; k < subcategories.length; k++) {

                var subcategory = {
                  parent: categories[j].name,
                  value: subcategories[k].name,
                  label: subcategories[k].name
                }
                self.subcategories().push(subcategory);
              }
              self.categories().push(category);
            }
            self.roles().push(role);
          }

          self.rolebasedcategory(self.categories());
          self.categorybasedsubcategory(self.subcategories());
        });
      }

      getcategories();

      // RESET CATEGORY FIELD
      resetcat = function () {
        self.role('');
        self.category('');
        self.subcategory('');
      }

      // CREATE CATEGORY
      createcategory = function () {

        if (self.role().length == 0) {
          alert("Please select role.");
          return;
        }
        if (self.category().length > 0 && self.role().length == 0) {
          alert("Please select role before you select category.");
          return;
        }
        if (self.subcategory().length > 0 && self.category().length == 0) {
          alert("Please select Category before you select Sub-Category.");
          return;
        }

        var catagory = {
          role: self.role(),
          suite: self.category(),
          service: self.subcategory()
        }

        console.log(ko.toJSON(catagory));

        var url = 'https://apex.oraclecorp.com/pls/apex/se_cloud_ready_training/training/createCategory';

        $.ajax({
          url: url,
          cache: false,
          type: 'POST',
          beforeSend: function (xhr) {
            xhr.setRequestHeader("role", self.role());
            xhr.setRequestHeader("suite", self.category());
            xhr.setRequestHeader("service", self.subcategory());
          },
          success: function (data) {
            resetcat();
            getcategories();
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
        });

      }	
  		
/*----------------------------------PLACEHOLDER SELECT ROLE POPUP----------------------------------*/
            self.emptyPlaceholder = ko.observable(false);

            self.handleAttached = function(info) {
                // Implement if needed
            };
			
      self.closeRole = function() {
          $("#modalDialog1").ojDialog("close")
      };

      //EVENT HANDLE FOR CATEGORY SELECTION
      categorySelected = function (event, ui) {
        populateSubcategory(ui.value);
      }
      self.openReqtraining = function() {
          $("#trainingDialog").ojDialog("open");
      };


            /*----------------------------------GET COURSES----------------------------------*/
            self.role = ko.observableArray([]);
            self.getrole = function(){
                $.getJSON(baseurl + "getCategories").then(function (roleslist) //CODE FOR THE ROLE POPUP
                {
                    for (var i = 0; i < roleslist.roles.length; i++) 
                    {
                        var filt = roleslist.roles[i].name;
                        self.role.push({
                            value: filt,
                            label: filt
                        });
                    }
                    $("#modalDialog1").ojDialog("open");

                });
            }

            self.getrole();

            roleselected=function(){
                self.fetchcourses();
            }

            searchcourses=function(){
                self.searchfetchcourses();
            }
            /*-----------------------   GET COURSES LIST   ----------------------*/
            
            self.categories=ko.observableArray([]);
            self.courseslistbycat = ko.observableArray();
            self.schedules = ko.observableArray([]);
            self.searchtext = ko.observableArray([]);
            self.fetchcourses=function(){                
                if(self.selectedrole().length==0)
                {
                    alert("Please select a role then proceed");
                    return;
                }
                else
                {
                    var role=self.selectedrole()[0];
                    // var text=self.searchtext.length>0?self.searchtext:'';
                    $.ajax({
                        url: baseurl + "getCourseByFreetext",
                        method: 'GET',
                        headers: {
                            role_name: role,
                            free_text_search: ''
                        },
                        success: function(allcourses) {
                            self.processCoursesFromService(allcourses);
                        },
                        error: function(xhr) {
                            alert(xhr);
                        }
                    });
                }                
            }

            self.searchfetchcourses=function(){   
                if(self.searchtext().length==0)
                {
                    alert("Enter text to search");
                    return;
                }
                else
                {
                    var role=self.selectedrole()[0];
                    var text=self.searchtext().length>0?self.searchtext():'';
                    $.ajax({
                        url: baseurl + "getCourseByFreetext",
                        method: 'GET',
                        headers: {
                            role_name: role,
                            free_text_search: text
                        },
                        success: function(allcourses) {
                            self.processCoursesFromService(allcourses);
                            
                        },
                        error: function(xhr) {
                            alert(xhr);
                        }
                    });
                }                
            }            

            self.processCoursesFromService=function(allcourses){
                self.categories([]);
                for(var k=0;k<allcourses.courses.length;k++)
                {
                    startday = allcourses.courses[k].schedule[0];
                    var curcourse=allcourses.courses[k];                        
                    var categoryname=curcourse.category;// console.log(categoryname);                        
                    var categoryobj=self.getcategorybyname(categoryname);
                    self.courseslistbycat=categoryobj.courses;
                    self.courseslistbycat.push({
                        name: curcourse.name,
                        description: curcourse.description,
                        class_size: curcourse.class_size,
                        cloud_onpremise: curcourse.cloud_onpremise,
                        training_level: curcourse.training_level,
                        training_type: curcourse.training_type,
                        category: curcourse.category,
                        start_date: startday == undefined ? "NA" : startday.start_date,
                        directURL: curcourse.directURL
                    });                   
                }    
                console.log(ko.toJSON(self.categories()));
                self.getcategorycount();
            }
            
            self.getcategorycount=function(){
                self.catcnt([]);
                var cnt = 0;
                if(self.courseslistbycat().length>0)
                {
                    for(var i=0;i<self.categories().length;i++)
                    {
                        var name=self.categories()[i].name;
                        cnt=self.courseslistbycat().length;
                        console.log(cnt);
                        self.catcnt.push({
                            name:name,
                            count:cnt
                        });
                    }
                    console.log(ko.toJSON(self.catcnt()));
                }
                else
                {
                    alert("No Courses present for this role.");
                    return;
                }
            }

            // self.getcomplexitycount=function(){
            //     self.comcnt([]);
            //     var cmcnt = 0;
            //     var counts = {};
            //     if(self.courseslistbycat().length>0)
            //     {
            //         for(var i=0;i<self.categories().length;i++)
            //         {
            //             var num = self.categories()[i].training_level;
            //             counts[num] = counts[num] ? counts[num] + 1 : 1;
            //             console.log(counts[num]);
            //             // var com=self.categories()[i].training_level;
            //             // cmcnt=self.courseslistbycat().length;
            //             // console.log(cmcnt);
            //             // self.comcnt.push({
            //             //     name:name,
            //             //     count:cnt
            //             // });
            //         }
            //         // console.log(ko.toJSON(self.comcnt()));
            //     }
            //     else
            //     {
            //         alert("No Courses present for this role.");
            //         return;
            //     }
            // }  
            // self.getcomplexitycount();

            self.getcategorybyname=function(catname){                
                // Look if the category is already present in the array
                for(var i=0;i<self.categories().length;i++){
                    if(self.categories()[i].name===catname){
                        return self.categories()[i];
                    }
                }                
                // Category is not present so we need to insert the category in the array
                self.categories.push({
                    name:catname,
                    courses:ko.observableArray([])
                });                
                var lastindex=self.categories().length-1;
                return self.categories()[lastindex];                
            }            
            /*------------------------------  END  ------------------------------*/

            /*----------------------------------SEARCH----------------------------------*/

            /*----------------------------------FLIP----------------------------------*/

            // Keep track of whether the front or back is showing
            self.showingFront = true;

            self.showBack = function() {
                var elem = document.getElementById('animatable');

                // Determine startAngle and endAngle
                var startAngle = '0deg';
                var endAngle = '180deg';

                // Animate the element
                oj.AnimationUtils['flipOut'](elem, {
                    'flipTarget': 'children',
                    'persist': 'all',
                    'startAngle': startAngle,
                    'endAngle': endAngle
                });

                self.showingFront = !self.showingFront;
            };
            self.showFront = function() {

                var elem = document.getElementById('animatable');

                // Determine startAngle and endAngle
                var startAngle = '180deg';
                var endAngle = '0deg';

                // Animate the element
                oj.AnimationUtils['flipOut'](elem, {
                    'flipTarget': 'children',
                    'persist': 'all',
                    'startAngle': startAngle,
                    'endAngle': endAngle
                });

                self.showingFront = self.showingFront;
            };

            self.dataSeries = [{
                    name: "Series 1",
                    items: [42]
                },
                {
                    name: "Series 2",
                    items: [55]
                },
                {
                    name: "Series 3",
                    items: [36]
                },
                {
                    name: "Series 4",
                    items: [10]
                },
                {
                    name: "Series 5",
                    items: [5]
                }
            ];

            self.datasource = new oj.ArrayTableDataSource(this.dataSeries, {
                idAttribute: 'name'
            });

            /*----------------------------------FLIP----------------------------------*/


            self.handleBindingsApplied = function(info) {
                // Implement if needed
            };


            self.handleDetached = function(info) {
                // Implement if needed
            };


            /*----------------------------------SEARCH----------------------------------*/
            self.currentValue = ko.observableArray();
            self.currentRawValue = ko.observable();
            self.buttonDisabled = ko.observable(true);

            self.searchInput = function() {
                
            };

            // callback when an option changes. Check is that the option changed is 'rawValue' and 
            // if 'rawValue' is not empty, enable the 'Search' button, else disable it.
            // self.optionChangeCallback = function(event, data) {
            //     var rawValue, elem;
            //     if (data['option'] === "rawValue") {
            //         elem = $("#search-input");
            //         rawValue = elem.ojInputSearch("option", "rawValue");
            //         if (rawValue) {
            //             self.buttonDisabled(false);
            //         } else {
            //             self.buttonDisabled(true);
            //         }
            //     }
            // };
            /*----------------------------------SEARCH----------------------------------*/




        }

        return new DashboardViewModel();
    }
);