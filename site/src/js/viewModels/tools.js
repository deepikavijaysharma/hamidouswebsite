/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 
    'ojs/ojradioset', 'ojs/ojaccordion', 'ojs/ojcollapsible', 'ojs/ojmodule', 'ojs/ojmoduleanimations', 'ojs/ojanimation'],
    function (oj, ko, $) {

        function DashboardViewModel() {


            var self = this;
          self.currentFilter = ko.observable("se");
		  
this.newExpanded = ko.observableArray();
    
		  
		  self.expandall = function(){
				$("#accordionPage").ojAccordion( { "expanded": ['c1','c2','c3','c4'], "multiple": true } );
		  }
		  self.closeall = function(){
				$("#accordionPage").ojAccordion( { "expanded": []} );
		  }
		 
    
		  self.readMore = function(){			 
			
			  $('#readmorelink').hide();
			  $('#readlesslink').show();
			 $('#moretext').toggle('slow', function() {   
  });
			  
			  }
			  
			 self.readLess = function(){			 
			
			   $('#readmorelink').show();
			  $('#readlesslink').hide();
			 $('#moretext').toggle('slow', function() {   
  });
			  
			  } 
		  
		 self.setFilter = function(data, event) {
        var id = event.target.id;
		if ($("input#"+id).is(":checked")) {
				 $(".filtersections").hide();
                $("div#"+id).show();
            } 
			
			else {
               
            }
        return true;
      }


        }
        return new DashboardViewModel();
    }
);
