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
/*----------------------------------SELECT ROLE POPUP----------------------------------*/		
            $(document).ready(function() {
                $("#modalDialog1").ojDialog("open");
            });
/*----------------------------------PLACEHOLDER SELECT ROLE POPUP----------------------------------*/
            self.emptyPlaceholder = ko.observable(false);

            self.handleAttached = function(info) {
                // Implement if needed
            };
			
			self.closeRole = function() {
				$("#modalDialog1").ojDialog("close")
				};
		
				
				self.openReqtraining =         function() {
				 $("#trainingDialog").ojDialog("open");
				
				};

            /*----------------------------------GET COURSES----------------------------------*/
            self.data = ko.observableArray();
            self.schedules = ko.observableArray();
            $.getJSON("https://apex.oraclecorp.com/pls/apex/se_cloud_ready_training/training/getCourses").
            then(function(allcourses) {
                $.each(allcourses.courses, function() {

                    self.data.push({
                        name: this.name,
                        class_size: this.class_size,
                        cloud_onpremise: this.cloud_onpremise,
                        training_level: this.training_level,
                        training_type: this.training_type,
                    });
                    /* $.each(this.schedule, function (i,date) {
							 self.schedules.push({
								 start_date: date.start_date
                           });
                        });
						
						   self.data.push({start_dates:self.schedules});
						console.log();*/

                });
            });

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
                alert("We enable the Search button when rawValue is not empty.");
            };

            // callback when an option changes. Check is that the option changed is 'rawValue' and 
            // if 'rawValue' is not empty, enable the 'Search' button, else disable it.
            self.optionChangeCallback = function(event, data) {
                var rawValue, elem;
                if (data['option'] === "rawValue") {
                    elem = $("#search-input");
                    rawValue = elem.ojInputSearch("option", "rawValue");
                    if (rawValue) {
                        self.buttonDisabled(false);
                    } else {
                        self.buttonDisabled(true);
                    }
                }
            };
            /*----------------------------------SEARCH----------------------------------*/




        }

        return new DashboardViewModel();
    }
);