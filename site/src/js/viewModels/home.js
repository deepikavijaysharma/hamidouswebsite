/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
 
define(['ojs/ojcore', 'knockout',  'jquery','ojs/ojfilmstrip', 'ojs/ojpagingcontrol','ojs/ojradioset','ojs/ojtabs', 'ojs/ojconveyorbelt','ojs/ojbutton','ojs/ojpopup','ojs/ojdialog','ojs/ojanimation'],
 function(oj, ko, $) {
  
    function HomeViewModel() {
   var self = this;
   
   self.openVideo = function() { 
				$("#modalDialog1").ojDialog("open");
				};
 self.empf1 = function() { 
$("#empf1").ojDialog("open");
};
 self.empf2 = function() { 
$("#empf2").ojDialog("open");
};

    $(document).ready(function() {
		function isIE(userAgent) {
  userAgent = userAgent || navigator.userAgent;
  return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;
}
                var mainBar = document.getElementById("mainBar");
				var mainBar_h = mainBar.offsetHeight;
				var secnav = document.getElementById("setupBar");
				var secnav_h = secnav.offsetHeight;

update_pos = function()
    {
       // alert(document.body.scrollTop);
		  if (document.documentElement.scrollTop > mainBar_h || document.body.scrollTop > mainBar_h ||document.getElementById("globalBody").scrollTop )
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
/* add IE CONDITION HERE - IN PROGRESS */

document.addEventListener("scroll", update_pos);
document.getElementById("globalBody").addEventListener("scroll", update_pos);



  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top 
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

        });
		
		/******************************************FLIP*****************************************************/
	  
	   self.showingFront = true;
    
    self.buttonClick = function(id) {
		
      var elem = document.getElementById(id);
      
      // Determine startAngle and endAngle
      var startAngle = self.showingFront ? '0deg' : '180deg';
      var endAngle = self.showingFront ? '180deg' : '0deg';

      // Animate the element
      oj.AnimationUtils['flipOut'](elem, {'flipTarget': 'children',
                                          'persist': 'all',
                                          'startAngle': startAngle,
                                          'endAngle': endAngle});

      self.showingFront = !self.showingFront;
    };
	
	

  
	  
	  
	  /******************************************FLIP ENDS*****************************************************/
        
        self.slide = [
            { name: '<div class="verticalcentertext"><div class="heading">NATD Solution Engineering and Customer Success<br>Organizational Road  Show  </div><div class="text">Listen in as Hamidou Dia and  the executive management team present<br>the FY18 vision  for the organization and  address top questions. </div><div class="slidernav"><ul><li><a href="https://otube.oracle.com/media/Solution+Engineering+Townhalll+-+Rich+Geraffo/0_kxtrumbd/3264" target="_blank">Rich Geraffo Presentaiton<span>&nbsp;&nbsp;<img src="css/images/aroow_right.png"></span></a></li><li>|</li><li><a href="https://otube.oracle.com/media/Solution+Engineering+Townhall+-+Hamidou+Dia/0_avsugpyl/3264" target="_blank">Hamidou Dia Presentaiton<span>&nbsp;&nbsp;<img src="css/images/aroow_right.png"></span></a></li><li>|</li><li><a href="https://otube.oracle.com/media/Solution+Engineering+TownhallA+Panel+Discussion+Part+1/0_nsg066tx/3264" target="_blank">Leadership Panel Part 1<span>&nbsp;&nbsp;<img src="css/images/aroow_right.png"></span></a></li><li>|</li><li><a href="https://otube.oracle.com/media/Solution+Engineering+Town+HallA+Panel+Discussion+Part+2+and+Q&A/0_s1q634j9/3264" target="_blank">Leadership Panel Part 2<span>&nbsp;&nbsp;<img src="css/images/aroow_right.png"></span></a></li></ul></div></div>',classname:'slide1' },
			 { name: '<div class="verticalcentertext"><div class="verticalcentertextinner"><div class="heading">Announcing Universal Credits <br>Flexibility and Choice</div><div class="text">To find out more about the roll out of Universal Credits, including weekly office hours, training resources, and replays, be sure to click here. </div><div class="buttons_c oj-rwow oj-flex"><div class="oj-sm-12 "><div class=" buttons"><a href="https://oradocs-corp.sites.us2.oraclecloud.com/authsite/cloud-na/" target="_blank">Open <span class="right-arrow"></span></a></div></div><div class="oj-sm-12 oj-xl-6 oj-xl-float-end"></div></div></div></div>',classname:'slide2' }
           
            
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
