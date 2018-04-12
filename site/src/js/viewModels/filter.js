/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'date', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojcheckboxset', 'ojs/ojanimation', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojdialog', 'ojs/ojdatetimepicker',
        'ojs/ojselectcombobox', 'ojs/ojtimezonedata', 'ojs/ojswitch', 'ojs/ojswitch', 'ojs/ojdialog', 'ojs/ojcollapsible', 'ojs/ojaccordion', 'ojs/ojtree','ojs/ojtabs'
    ],
    function (oj, ko, $) {

        function DashboardViewModel() {


            var self = this;
            
            self.val = ko.observableArray();

			self.selectedview =  ko.observableArray();
			self.setFilter = function() {
				 
				 if(self.selectedview()=='tab-live'){
					 $('#tab-live').show();
					 $('#tab-ondemand').hide();
				 }
				else{
						 $('#tab-ondemand').show();
						 $('#tab-live').hide();
				}
				
				 
   
			 }
            
        }
        return new DashboardViewModel();
    }
);
