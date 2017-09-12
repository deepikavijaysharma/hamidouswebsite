<<<<<<< HEAD:site/src/js/viewModels/training.js
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojcollapsible', 'ojs/ojanimation', 'ojs/ojchart', 'ojs/ojselectcombobox', 'ojs/ojbutton','ojs/ojinputtext'],
    function(oj, ko, $) {
=======
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojknockout',
      'ojs/ojselectcombobox', 'ojs/ojbutton','ojs/ojnavigationlist','ojs/ojswitch','ojs/ojradioset', 'ojs/ojcollapsible'],
 function(oj, ko, $) {
  
    function IncidentsViewModel() {
      var self = this;
                 this.navigationLevel = ko.observable('page');
           this.isChecked = ko.observable();
           this.isChecked.subscribe(function(newValue) {
               var navlistInstances = $('#navlistdemo').find(':oj-navigationlist');
               if(newValue) {
                   navlistInstances.addClass('oj-sm-condense');
               } else {
                   navlistInstances.removeClass('oj-sm-condense');
               }
           });
           this.isContrastBackground = ko.observable(false);
           this.isContrastBackground.subscribe(function(newValue) {
               if(newValue) {
                   $(".navlistcontainer").addClass("demo-panel-contrast1 oj-contrast-marker");
               } else {
                   $(".navlistcontainer").removeClass("demo-panel-contrast1 oj-contrast-marker");
               }
           });
       self.currentValue = ko.observableArray();
      self.currentRawValue = ko.observable();
      self.buttonDisabled = ko.observable(true);

      self.searchInput = function()
      {
        alert("We enable the Search button when rawValue is not empty.");
      };

      // // callback when an option changes. Check is that the option changed is 'rawValue' and 
      // // if 'rawValue' is not empty, enable the 'Search' button, else disable it.
      self.optionChangeCallback = function(event, data)
      {
        var rawValue, elem;
        if (data['option'] === "rawValue")
        {
          elem = $("#search-input");
          rawValue = elem.ojInputSearch("option", "rawValue");
          if (rawValue)
          {
            self.buttonDisabled(false);
          }
          else
          {
            self.buttonDisabled(true);
          }
        }      
      };
      //         self.chemicals = [
      //       { name: 'Mandatory Courses (13 Courses)', 
      //         sizeClass: 'oj-masonrylayout-tile-2x2 coursescat' },
      //       { name: 'Course Title', 
      //         sizeClass: 'oj-masonrylayout-tile-2x2 courses' },
      //       { name: 'Course Title', 
      //         sizeClass: 'oj-masonrylayout-tile-2x2 courses' },
      //       { name: 'Course Title', 
      //         sizeClass: 'oj-masonrylayout-tile-2x2 courses' }
      //   ];
   //      self.handleOpen = $("#buttonOpener").click(function() {
   //     $("#modalDialog1").ojDialog("open"); });

   // self.handleOKClose = $("#okButton").click(function() {
   //     $("#modalDialog1").ojDialog("close"); });
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.
>>>>>>> d1d569b882dadaa8104713fd7b9421bcbb55f1d7:site/src/js/viewModels/incidents.js

        function DashboardViewModel() {
            var self = this;
            
            self.handleActivated = function(info) {
                // Implement if needed
            };

            
            self.handleAttached = function(info) {
                // Implement if needed
            };
			/*----------------------------------GET COURSES----------------------------------*/
			self.data = ko.observableArray();
			self.schedules = ko.observableArray();
			$.getJSON("https://apex.oraclecorp.com/pls/apex/se_cloud_ready_training/training/getCourses").
                then(function (allcourses) {
                    $.each(allcourses.courses, function () {
					
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

<<<<<<< HEAD:site/src/js/viewModels/training.js
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
=======
      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }
    // $(function() {
    //   ko.applyBindings(null, document.getElementById('panelPage'))
    // });
    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new IncidentsViewModel();
  }
);
>>>>>>> d1d569b882dadaa8104713fd7b9421bcbb55f1d7:site/src/js/viewModels/incidents.js
