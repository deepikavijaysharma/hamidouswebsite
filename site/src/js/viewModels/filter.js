/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 
    'ojs/ojradioset', 'ojs/ojbutton'],
    function (oj, ko, $) {

        function DashboardViewModel() {

            var self = this;
            self.selectedview =  ko.observable("tab-live");
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
