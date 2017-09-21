/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojfilmstrip', 'ojs/ojpagingcontrol','ojs/ojradioset','ojs/ojtabs', 'ojs/ojconveyorbelt','ojs/ojbutton'],
 function(oj, ko, $) {
  
    function HomeViewModel() {
   var self = this;
    $(document).ready(function() {
                var mainBar = document.getElementById("mainBar");
				var mainBar_h = mainBar.offsetHeight;
				var secnav = document.getElementById("setupBar");
				var secnav_h = secnav.offsetHeight;

update_pos = function()
    {
       // alert(document.body.scrollTop);
		  if (document.documentElement.scrollTop > mainBar_h || document.body.scrollTop > mainBar_h )
        {
            setupBar.style.position = "fixed";
            setupBar.style.top = "0";
        }
        else
        {
            setupBar.style.position = "relative";
            setupBar.style.top = "";
			
        }
        
    }


document.addEventListener("scroll", update_pos);

if(window.addEventListener) {
    window.addEventListener("hashchange", addMargin);
}
else if (window.attachEvent) {
    window.attachEvent("onhashchange", addMargin);//SEE HERE...
    //missed the on. Fixed thanks to @Robs answer.
	
}

function addMargin() {
	
    window.scrollTo(0, window.pageYOffset - secnav_h);
}

            });
        
        self.slide = [
            { name: '<div class="verticalcentertext"><div class="heading">Get Ready for Oracle Open World and JavaOne</div><div class="text">The industry’s most important conferences are coming, October 1 to 5 in San Francisco.</div><div class="buttons_c oj-rwow oj-flex"><div class="oj-sm-12 "><div class=" buttons">Register for Oracle OpenWorld <span class="right-arrow"></span></div><div class="buttons">Register for JavaOne <span class="right-arrow"></span></div></div><div class="oj-sm-12 oj-xl-6 oj-xl-float-end"></div></div></div>',classname:'slide1' },
            { name: 'Slide 2',classname:'slide2' },
            { name: 'Slide 3',classname:'slide3' },
            
        ];
		self.chemicals = [
            { name: 'Hydrogen' },
            { name: 'Helium' },
            { name: 'Lithium' },
            { name: 'Beryllium' },
            { name: 'Boron' },
            { name: 'Carbon' },
            { name: 'Nitrogen' },
            { name: 'Oxygen' },
            { name: 'Fluorine' },
            { name: 'Neon' },
            { name: 'Sodium' },
            { name: 'Magnesium' }
        ];
        self.pagingModel = null;
		self.pagingModelfeatured = null;
		self.pagingModelwins = null;
		self.currentNavArrowPlacement = ko.observable("adjacent");
        self.currentNavArrowVisibility = ko.observable("auto");
        
        getItemInitialDisplay = function(index)
        { 
          return index < 1 ? '' : 'none';
        };
		
        
        getPagingModelslider = function()
        {
          if (!self.pagingModel)
          {
            var filmStrip = $("#filmStrip");
            var pagingModel = filmStrip.ojFilmStrip("getPagingModel");
            self.pagingModel = pagingModel;
          }
          return self.pagingModel;
        };
		getPagingModelfeatured = function()
        {
          if (!self.pagingModelfeatured)
          {
            var filmStrip = $("#filmStripfeatured");
            var pagingModel = filmStrip.ojFilmStrip("getPagingModel");
            self.pagingModelfeatured = pagingModel;
          }
          return self.pagingModelfeatured;
        };
		getPagingModelwins = function()
        {
          if (!self.pagingModelwins)
          {
            var filmStrip = $("#filmStripwins");
            var pagingModel = filmStrip.ojFilmStrip("getPagingModel");
            self.pagingModelwins = pagingModel;
          }
          return self.pagingModelwins;
        };
		
		
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new HomeViewModel();
  }
);
