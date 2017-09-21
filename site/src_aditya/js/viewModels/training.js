/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojcollapsible', 'ojs/ojanimation', 'ojs/ojchart', 'ojs/ojselectcombobox', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojdialog'],
    function(oj, ko, $) {

        function DashboardViewModel() {


            var self = this;

/*----------------------------------PLACEHOLDER SELECT ROLE POPUP----------------------------------*/
            self.emptyPlaceholder = ko.observable(false);

            // selected role from drop down
            self.selectedrole=ko.observable('');

            // COURSE SEARCH FIELD
            self.searchtext=ko.observable('');

            // category count
            self.catcnt = ko.observableArray([]);

            // complexity count
            self.comcnt = ko.observableArray([]);

            self.handleAttached = function(info) {
                // Implement if needed
            };
			
            self.closeRole = function() {
                $("#modalDialog1").ojDialog("close")
            };


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
                // alert("We enable the Search button when rawValue is not empty.");
            };

            // callback when an option changes. Check is that the option changed is 'rawValue' and 
            // if 'rawValue' is not empty, enable the 'Search' button, else disable it.
            // this.searchhandler = function (desc) {
            //     //         this.tags = ko.observableArray([
            //     //         { 
            //     //             value: "XML", label: "XML" 
            //     //             value:catname,
            //     //             label:ko.observableArray([])
            //     //         }
            //     //         ]);

            //     // this.keyword = ko.observableArray();
            //     //         console.log(desc);
            //     var searchkey = self.searchtext() != "" ? self.searchtext()[0] : "";
            // }
            // self.optionChangeCallback = function(event, data) {
            //     var rawValue, elem;
            //     if (data['option'] === "rawValue") {
            //         elem = $("#search-input");
            //         rawValue = elem.ojInputSearch("option", "rawValue");
            //         // console.log(rawValue);
            //         // console.log(value);
            //         if (rawValue) {
            //             self.buttonDisabled(false);
            //             // $.ajax({
            //             //     url: baseurl + "getCourseByFreetext",
            //             //     method: 'GET',
            //             //     headers: {
            //             //         role_name: rawValue,
            //             //         free_text_search: rawValue
            //             //       },
            //             //     success: function(res) {
            //             //         console.log(res);
            //             //     },
            //             //     error: function(xhr) {
            //             //     }
            //             // });
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