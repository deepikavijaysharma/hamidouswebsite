/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
    'ojs/ojoffcanvas', 'ojs/ojtoolbar', 'ojs/ojmenu'
  ],
  function (oj, ko) {
    function ControllerViewModel() {
      var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
        'home': {
          label: 'Home',
          isDefault: true
        },
        'training': {
          label: 'trainings'
        },
        'tools': {
          label: 'Tools and Resources'
        },
        'courses': {
          label: 'Courses'
        },
        'communitycalls': {
          label: 'Community Calls'
        },
        'offers': {
          label: 'Offers'
        },
        'admin': {
          label: 'Admin'
        }
      });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Navigation setup
      var navData = [{
          name: 'Home',
          id: 'home'
        },
        {
          name: 'Trainings and Certifications',
          id: 'training'
        },
        {
          name: 'Tools and Resources',
          id: 'tools'
        }

      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {
        idAttribute: 'id'
      });

      // LOGIN INITIATION
      isloggedin = function () {
        if (ssoemail.length > 0) {
          document.getElementById('logoutbutton').style.display = 'block';
          document.getElementById('logoutbutton1').style.display = 'block';
          if(!newUserAdminCheck){
            checkadmin();
          }


          if (self.ssowindow != undefined) {
            console.log('closing sso window');
            self.ssowindow.close();
          }
        } else {
          document.getElementById('logoutbutton').style.display = 'block';
          document.getElementById('logoutbutton1').style.display = 'block';          
        }
      }

      initsso = function () {
        if (ssoemail.length == 0) {
          self.ssowindow = window.open("http://solutionengineering.us.oracle.com/seaas/");
        }
      }

      closesso = function () {
        if (ssoemail.length > 0) {
          self.ssowindow = window.open("https://login-stage.oracle.com:443/oam/server/logout", target = "_self");
        }
      }

      getemailfromcookie = function () {

        // debuglog('~~~~~~~~~~~~~~~  COOKIE  ~~~~~~~~~~~~~');
        // debuglog(document.cookie);
        // debuglog('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        // get user email
        var user = document.cookie.split(';').map(function (x) {
          return x.trim().split('=');
        }).reduce(
          function (a, b) {
            a[b[0]] = b[1];
            return a;
          }, {})["ORA_UCM_INFO"];
        user = typeof user !== "undefined" ? user : "";
        var n = user.lastIndexOf("~");

        email = user.substr(n + 1, user.length);
        
        if (email) {
          ssoemail = email;
        } else {
          ssoemail = "";
        }
      }
      

      checkadmin=function(){
        var checkurl="https://apex.oraclecorp.com/pls/apex/se_cloud_ready_training/training/isAdmin";
        if (ssoemail.length > 0) {
          console.log("Admin check commenced");
          $.ajax({
            url: checkurl,
            method: 'GET',
            headers: {
                email: ssoemail
            },
            success: function (data) {
              isAdmin=data.is_admin;
              newUserAdminCheck=true;
            },
            error: function (xhr) {
                //alert(xhr);
                newUserAdminCheck=false;
            }
        });
        }
      }

      // setInterval(function () {
      //   getemailfromcookie();
      //   isloggedin();
      // }, 500);

      isloggedin();
      getemailfromcookie();
      checkadmin();

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function () {
        oj.OffcanvasUtils.close(self.drawerParams);
      });
      self.drawerParams = {
        displayMode: 'overlay',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function () {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function () {
        $('#drawerToggleButton').focus();
      });





      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");
      self.addActive = function (routername, pid) {
        // alert("s");
        if (routername === pid) {

          return 'active';
        }

      };
      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
         new footerLink('Home', 'home', '?root=home'),
        new footerLink('ECAL Site', 'ecal', 'http://innovate.us.oracle.com/ecal/', '_blank'),
        new footerLink('Cloud Accelerate Site', 'cloudaccelerate', 'http://innovate.us.oracle.com/cloudaccelerate/', '_blank'),
		new footerLink('Contact Us', 'contactus', 'mailto:heather.hughes@oracle.com'),
        
      ]);
    }

    return new ControllerViewModel();
  }
);