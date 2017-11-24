/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
 
define(['ojs/ojcore', 'knockout',  'jquery','ojs/ojfilmstrip', 'ojs/ojpagingcontrol','ojs/ojradioset','ojs/ojtabs', 'ojs/ojconveyorbelt','ojs/ojbutton','ojs/ojpopup','ojs/ojdialog','ojs/ojanimation','ojs/ojselectcombobox','bootstrap', 'ojs/ojinputtext'],
 function(oj, ko, $) {
  
    function HomeViewModel() {
        var self = this;

        //CREATE SLIDER observables
        self.sliderheading = ko.observable('');
        self.slidertext = ko.observable('');
        self.sliderlink = ko.observable('');
        self.sliderbackground = ko.observable('');
        self.sliderList = ko.observableArray([]);

        //CREATE ORGANIZATION observables
        self.organization = ko.observable([]);
        self.orgpeoplename = ko.observable('');
        self.orgpeopledesignation = ko.observable('');
        self.orgpeoplephoto = ko.observable('');
        self.orgList = ko.observableArray([]);
        self.organizationlist = ko.observableArray([]);
        self.orgname = ko.observable('');
        self.organizationpeoplelist = ko.observableArray([]);
        self.sliderlist = ko.observableArray([]);

        self.openVideo = function() { 
			$("#modalDialog1").ojDialog("open");
		};
        self.empf1 = function() { 
            $("#empf1").ojDialog("open");
        };
        self.empf2 = function() { 
            $("#empf2").ojDialog("open");
        };
        self.empf3 = function() { 
            $("#empf3").ojDialog("open");
        };

        var urlorglov = 'https://apex.oraclecorp.com/pls/apex/training_app_dev/seaashm/GETORGLOV';

        $.getJSON(urlorglov).then(function (orgtypes) {
            // Get Organization type in select in ADD ORGANIZATION
            self.organizationlist([]);
            var orglist = orgtypes.items;
            for (var b = 0; b < orglist.length; b++) {

                self.organizationlist.push({
                    orgname: orglist[b].org_name
                })
            }// console.log(ko.toJSON(self.organizationlist()));
        });

        // self.organization([]);

        // // CREATE ORGANIZATION
        // createorg = function () {

        //     if (self.orgpeoplename().length == 0) {
        //         alert("Please enter name of the employee in organization");
        //         return;
        //     }


        //     if (self.orgpeopledesignation().length == 0) {

        //         alert("Please enter designation of employee");
        //         return;
        //     }

        //     if (self.selectedcallmode().length == 0) {
        //         alert("Please select mode of delivary");
        //     }

        //     //          var val = $("#file").val();
        //     // if(val == ''){
        //     //    return false;
        //     // }


        //     var org = {
        //         organization: self.organization(),
        //         name: self.orgpeoplename(),
        //         designation: self.orgpeopledesignation(),
        //         photo: self.orgpeoplephoto(),
        //     }

        //     console.log(ko.toJSON(org));
        //     var url = 'http://10.146.89.49:7003/ords/seaashm/seaashm/org';

        //     $.ajax({
        //         url: url,
        //         cache: false,
        //         type: 'POST',
        //         contentType: 'application/json; charset=utf-8',
        //         data: ko.toJSON(org),
        //         success: function (data) {
        //             resetorg();
        //             getOrg();

        //         }
        //     }).fail(function (xhr, textStatus, err) {
        //         // alert(err);
        //     });


        // }

        // //Reset ORGANIZATION Details
        // resetorg = function () {
        //     self.orgname('');
        //     self.orgpeoplename('');
        //     self.orgpeopledesignation('');
        //     self.orgpeoplephoto('');              
        // }

        uploadorgpeopleimage = function (event, ui) {
            addorgdialog(ui.value);
        }
        var employeephotopath = "";

        // var mimetype = "";
        imageselected = function (event)
        {
            employeephotopath = event.target.files[0];
            // mimetype = event.target.files[0].type;
            console.log("filename",employeephotopath);
        }
        //ORGANIZATION people profile pic upload
        addorgdialog = function () {
            // closeorgpeopleimageuploder();
            var reader = new FileReader();
            // var mimetype = event.target.files[0].type;
            // console.log(event.target.files[0]);

            var ranid = new Date().getUTCMilliseconds();
            reader.onload = function () {
              var uploadheader = {
                "organization": self.organizationlist()[0].orgname,
                "name": self.orgpeoplename(),
                "designation": self.orgpeopledesignation(),
                "mimetype": employeephotopath.type
                }

              var imagedata = reader.result.split('base64,')[1];

              console.log(uploadheader,reader.result);
              // SEND TO SERVER
              $.ajax({
                url: 'https://apex.oraclecorp.com/pls/apex/training_app_dev/seaashm/employee_data/',
                headers: uploadheader,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: imagedata,
                success: function (dataorg) {
                  // self.getorgpeoplephotos();
                  console.log(dataorg);
                  alert("Organization people added successfully!");
                }
              }).fail(function (xhr, textStatus, err) {
                alert(err);
              });
            };
            reader.readAsDataURL(employeephotopath);
        };

        fetchpeopleorg = function () {
            $.getJSON('https://apex.oraclecorp.com/pls/apex/training_app_dev/seaashm/employee_data/').then(function (orgpeopledetails) 
            {
                // Fetch organization people details
                self.organizationpeoplelist([]);
                var orgplist = orgpeopledetails.items;
                for (var b = 0; b < orgplist.length; b++) 
                {
                    self.organizationpeoplelist.push({
                        orgdesig: orgplist[b].designation,
                        orgempid: orgplist[b].empid,
                        orgimage: orgplist[b].image,
                        orgname: orgplist[b].name,
                        orglob: orgplist[b].organization
                    })
                }// console.log(ko.toJSON(self.organizationpeoplelist()));
            });
        }
        fetchpeopleorg();
        // //ORGANIZATION people profile pic push to server for display
        // self.getorgpeoplephotos = function () {
        //     $.getJSON('https://apex.oraclecorp.com/pls/apex/training_app_dev/seaashm/employee_data/').
        //       then(function (photos) {
        //         self.personalphotoslist([]);
        //         $.each(photos.items[0].personal_photos, function () {
        //           self.personalphotoslist.push({
        //             personal_photo_id: this.personal_photo_id,
        //             photo_value: this.value,
        //             photo_url: this.personal_photo_url
        //           });
        //           hidedialog();
        //         })
        //     });
        // }


        //GET ORGANIZATION 
        // getOrg = function () {
        //     $.getJSON("http://10.146.89.49:7003/getorg).then(function (data) {
        //         var org = data.items;
        //         self.orgList([]);
        //         for (var i = 0; i < org.length; i++) {
        //             self.orgList.push({
        //                 organization: org[i].organization != undefined ? org[i].organization : '',
        //                 name: org[i].name != undefined ? org[i].name : '',
        //                 designation: org[i].designation != undefined ? org[i].designation : '',
        //                 photo: org[i].photo != undefined ? org[i].photo : ''
        //             });
        //         }
        //         console.log(ko.toJSON(self.orgList()));
        //     });
        // }






        // $.getJSON(baseurl).
        //   then(function (organization) {
        //     $.each(organization.items, function () {
        //       self.organization.push(this.value);
        //     })
        //   });
        //   saveorganization = function () {
        //   closeeditprofiledialog();
        //   if (self.pillar()[0].length > 0 && self.center()[0].length > 0) {
        //     showdialog();
        //     var location = {
        //       employee_key: self.profile().employee_key(),
        //       pillar: self.pillar()[0],
        //       center: self.center()[0],
        //       mobile_phone: self.profile().mobile_phone(),
        //       profile_summary: self.profile().profile_summary()

        //     };
        //     debuglog(ko.toJSON(location));
        //     $.ajax({
        //       url: baseurl + 'ExtendedProfile',
        //       cache: false,
        //       type: 'POST',
        //       contentType: 'application/json; charset=utf-8',
        //       data: ko.toJSON(location),
        //       success: function (data) {
        //         //alert("Information saved successfully!");
        //         loadpage();
        //         hidedialog();
        //       }
        //     }).fail(function (xhr, textStatus, err) {
        //       alert(err);
        //       loadpage();
        //     });
        //   } else {
        //     alert('Please select Pillar and Hub.');
        //   }

        // }self.slimage([]);

        self.slimage = ko.observable([]);
        self.slid = ko.observable('');
        self.sltitle = ko.observable('');
        self.sldescription = ko.observable('');
        self.slbuttonlabel1 = ko.observable('');
        self.slbuttonlabel2 = ko.observable('');
        self.sllinktext1 = ko.observable('');
        self.sllinktext2 = ko.observable('');
        self.slimgid = ko.observable('');
        // self.logid = function(data, event) {
        // console.log("you clicked " + event.target.id);
        // }
        self.addslider = function () 
        {
            var selectedimageid = '';

            if (self.sltitle().length == 0) {
                alert("Please enter Banner Title");
                return;
            }

            if (self.sldescription().length == 0) {
                alert("Please enter Banner Description");
                return;
            }


            if (self.slbuttonlabel1().length == 0) {

                alert("Please enter Banner 1st Button Label");
                return;
            }
            if (self.slbuttonlabel2().length == 0) {
                
                alert("Please enter Banner 2nd Button Label");
                return;
            }

            if (self.sllinktext1().length == 0) {

                alert("Please enter Banner 1st Link");
                return;
            }

            if (self.sllinktext2().length == 0) {
                alert("Please enter Banner 2nd Link");
            }

            selectedimageid = ko.toJSON(self.slimgid());

            var sl = {
                id: self.slid(),
                title: self.sltitle(),
                description: self.sldescription(),
                button_label1: self.slbuttonlabel1(),
                button_label2: self.slbuttonlabel2(),
                link_text1:self.sllinktext1(),
                link_text2: self.sllinktext2(),
                image_id: self.slimage()[0].idimg
            }

            console.log(ko.toJSON(sl));

            $.ajax({
                url: 'https://apex.oraclecorp.com/pls/apex/training_app_dev/seaashm/home_screen_data',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(sl),
                success: function (sldata) {
                    console.log(ko.toJSON(sldata));
                    alert("slider data uploaded");
                }
            }).fail(function (xhr, textStatus, err) {
                alert(err);
            });
        }

        fetchslider = function () {
            $.getJSON('https://apex.oraclecorp.com/pls/apex/training_app_dev/seaashm/home_screen_data').then(function (fetchslider) 
            {
                // Fetch organization people details
                self.sliderlist([]);
                var sllist = fetchslider.items;
                for (var s = 0; s < sllist.length; s++) 
                {
                    self.sliderlist.push({
                        sliderbl1: sllist[s].button_label1,
                        sliderbl2: sllist[s].button_label2,
                        sliderdesc: sllist[s].description,
                        sliderid: sllist[s].id,
                        sliderimg: sllist[s].image,
                        sliderlt1: sllist[s].link_text1,
                        sliderlt2: sllist[s].link_text2,
                        slidertitle: sllist[s].title
                    })
                }console.log(ko.toJSON(self.sliderlist()));
            });
        }
        fetchslider();

        closedialog=function(){                
            $("#modalDialog1").ojDialog("close");
        }

        opendialog=function(){                
            $("#modalDialog1").ojDialog("open");
        }

        closedialog2=function(){                
            $("#modalDialog2").ojDialog("close");
        }

        opendialog2=function(){                
            $("#modalDialog2").ojDialog("open");
        }

        closedialog3=function(){                
            $("#modalDialog3").ojDialog("close");
        }

        opendialog3=function(){                
            $("#modalDialog3").ojDialog("open");
        }

        closedialog4=function(){                
            $("#modalDialog4").ojDialog("close");
        }

        opendialog4=function(){                
            $("#modalDialog4").ojDialog("open");
        }
        closedialog5=function(){                
            $("#modalDialog4]5").ojDialog("close");
        }

        opendialog5=function(){                
            $("#modalDialog5").ojDialog("open");
        }

        closedialog6=function(){
            $("#modalDialog6").ojDialog("close");
        }

        opendialog6=function(){                
            $("#modalDialog6").ojDialog("open");
        }

        closedialog7=function(){                
            $("#modalDialog7").ojDialog("close");
        }

        opendialog7=function(){                
            $("#modalDialog7").ojDialog("open");
        }

        closedialog8=function(){                
            $("#modalDialog8").ojDialog("close");
        }

        opendialog8=function(){                
            $("#modalDialog8").ojDialog("open");
        }

        closedialog9=function(){                
            $("#modalDialog9").ojDialog("close");
        }

        opendialog9=function(){                
            $("#modalDialog9").ojDialog("open");
        }

        closedialog10=function(){                
            $("#modalDialog10").ojDialog("close");
        }

        opendialog10=function(){                
            $("#modalDialog10").ojDialog("open");
        }

        closedialog11=function(){                
            $("#modalDialog11").ojDialog("close");
        }

        opendialog11=function(){                
            $("#modalDialog11").ojDialog("open");
        }

        closedialog12=function(){
            $("#modalDialog12").ojDialog("close");
        }

        opendialog12=function(){                
            $("#modalDialog12").ojDialog("open");
        }
		
		closedialog13=function(){                
            $("#modalDialog13").ojDialog("close");
        }

        opendialog13=function(){                
            $("#modalDialog13").ojDialog("open");
        }
		
		closedialog14=function(){                
            $("#modalDialog14").ojDialog("close");
        }

        opendialog14=function(){                
            $("#modalDialog14").ojDialog("open");
        }
		closedialog15=function(){                
            $("#modalDialog15").ojDialog("close");
        }

        opendialog15=function(){                
            $("#modalDialog15").ojDialog("open");
        }
		closedialog16=function(){                
            $("#modalDialog16").ojDialog("close");
        }

        opendialog16=function(){                
            $("#modalDialog16").ojDialog("open");
        }
		closedialog17=function(){                
            $("#modalDialog17").ojDialog("close");
        }

        opendialog17=function(){                
            $("#modalDialog17").ojDialog("open");
        }
		closedialog18=function(){                
            $("#modalDialog18").ojDialog("close");
        }

        opendialog18=function(){                
            $("#modalDialog18").ojDialog("open");
        }
		closedialog19=function(){                
            $("#modalDialog19").ojDialog("close");
        }

        opendialog19=function(){                
            $("#modalDialog19").ojDialog("open");
        }
		closedialog20=function(){                
            $("#modalDialog20").ojDialog("close");
        }

        opendialog20=function(){                
            $("#modalDialog20").ojDialog("open");
        }     

         $(document).ready(function() 
        {
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
                    secnav.style.position = "fixed";
                    secnav.style.top = "0";
                }
                else
                {
                    secnav.style.position = "relative";
                    secnav.style.top = "";
                    
                }
                
            }
            /* add IE CONDITION HERE - IN PROGRESS */

            document.addEventListener("scroll", update_pos);
            document.getElementById("globalBody").addEventListener("scroll", update_pos);

            // In-Page Scroll Animation
            // ------------------------
            $('#setupBar a[href^="#"]').on('click', function(e) {
                var hash  = this.hash,
                $hash = $(hash),
                addHash = function() {
                    window.location.hash = hash;
                };

                if ( hash !== '#header' ) {
                    // $hash.velocity('scroll', { duration: 500, offset: -50, complete: addHash }); // Velocity.js
                    $('html,body').animate({ 'scrollTop': $hash.offset().top -secnav_h }, 800, addHash);
                } else {
                    // $hash.velocity('scroll', { duration: 500, offset: 0, complete: addHash }); // Velocity.js
                    $('html,body').animate({ 'scrollTop': $hash.offset().top }, 800, addHash);
                }
                if ( hash == "#v-vision")
                {
                    $('html,body').animate({ 'scrollTop': '-=' + 150 }, 800, addHash);
                }
                else
                {
                    $('html,body').animate({ 'scrollTop': '-=' + 100 }, 800, addHash);
                }
            });  
            $('#myCarousel').carousel({ interval: 5000, cycle: true });

            /*Code for Add Slider*/
            // $("#selectImage").imagepicker({
            //     hide_select: true
            // });
        });

        $('#myCarousel').carousel();
		
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
            { name: '<div class="verticalcentertext"><div class="heading">NATD Solution Engineering and Customer Success<br>Organizational Road  Show  </div><div class="text">Listen in as Hamidou Dia and  the executive management team present<br>the FY18 vision  for the organization and  address top questions. </div><div class="slidernav"><ul><li><a href="https://otube.oracle.com/media/Solution+Engineering+Townhalll+-+Rich+Geraffo/0_kxtrumbd/3264" target="_blank">Rich Geraffo Presentation<span>&nbsp;&nbsp;<img src="css/images/aroow_right.png"></span></a></li><li class="oj-sm-only-hide">|</li><li><a href="https://otube.oracle.com/media/Solution+Engineering+Townhall+-+Hamidou+Dia/0_avsugpyl/3264" target="_blank">Hamidou Dia Presentation<span>&nbsp;&nbsp;<img src="css/images/aroow_right.png"></span></a></li><li class="oj-sm-only-hide">|</li><li><a href="https://otube.oracle.com/media/Solution+Engineering+TownhallA+Panel+Discussion+Part+1/0_nsg066tx/3264" target="_blank">Leadership Panel Part 1<span>&nbsp;&nbsp;<img src="css/images/aroow_right.png"></span></a></li><li class="oj-sm-only-hide">|</li><li><a href="https://otube.oracle.com/media/Solution+Engineering+Town+HallA+Panel+Discussion+Part+2+and+Q&A/0_s1q634j9/3264" target="_blank">Leadership Panel Part 2<span>&nbsp;&nbsp;<img src="css/images/aroow_right.png"></span></a></li></ul></div></div>',classname:'slide slide1' },
            { name: '<div class="verticalcentertext"><div class="verticalcentertextinner"><div class="heading">Announcing Universal Credits <br>Flexibility and Choice</div><div class="text">To find out more about the roll out of Universal Credits, including weekly office hours, training resources, and replays, be sure to click here. </div><div class="buttons_c oj-rwow oj-flex"><div class="oj-sm-12 "><div class=" buttons"><a href="https://oradocs-corp.sites.us2.oraclecloud.com/authsite/cloud-na/" target="_blank">Open <span class="right-arrow"></span></a></div></div><div class="oj-sm-12 oj-xl-6 oj-xl-float-end"></div></div></div></div>',classname:'slide slide2' },
            { name: '<div class="verticalcentertext"><div class="verticalcentertextinner"><div class="heading">Q1 NATD SE and CS All Hand’s Call</div><div class="text">Organizational Update and Awards, June 27th</div><div class="buttons_c oj-rwow oj-flex"><div class="oj-sm-12 "><div class=" buttons"><a href="https://otube.oracle.com/media/Solutions+Engineer+and+Cloud+Customer+Success+All+Hands/0_w2kl22gc" target="_blank">Replay <span class="right-arrow"></span></a></div></div><div class="oj-sm-12 oj-xl-6 oj-xl-float-end"></div></div></div></div>',classname:'slide slide3' },
            { name: '<div class="verticalcentertext"><div class="verticalcentertextinner"><div class="heading"><img src="css/images/hamidou_slider_pic.png" align="left" >Hamidou’s Headliner</div><div class="text">Organizational Update and Awards, June 27th</div><div class="buttons_c oj-rwow oj-flex"><div class="oj-sm-12 "><div class=" buttons"><a href="https://otube.oracle.com/media/HamidouHeadliner_06152017.mp4/0_5rt8xgio" target="_blank">Replay <span class="right-arrow"></span></a></div></div><div class="oj-sm-12 oj-xl-6 oj-xl-float-end"></div></div></div></div>',classname:'slide slide3' },
            { name: '<div class="verticalcentertext"><div class="verticalcentertextinner"><div class="heading">NATD Cloud Customer Success Go Live: Gap Inc.&rsquo;s Transformational<br>Journey on Oracle Cloud</div><div class="text">Listen into this podcast as Misha Logvinov, GVP, Customer Success, interviews Mark Carroll CSM and Jeff Wexler, ECA, on transforming business at Gap, Inc. </div><div class="buttons_c oj-rwow oj-flex"><div class="oj-sm-12 "><div class=" buttons"><a href="https://otube.oracle.com/media/GoLive_GAP_092517.mp4/0_9mo76xtq" target="_blank">Replay <span class="right-arrow"></span></a></div></div><div class="oj-sm-12 oj-xl-6 oj-xl-float-end"></div></div></div></div>',classname:'slide slide4' },
            { name: '<div class="verticalcentertext"><div class="verticalcentertextinner"><div class="container webcp"><div class="webc">Webcast</div></div><div class="heading">Run Oracle Cloud on Docker Containers</div><div class="text">Promote this webcast to your customers, featuring Ashutosh Tripathi,<br>Principal Cloud Platform Architect. </div><div class="buttons_c oj-rwow oj-flex"><div class="oj-sm-12 "><div class=" buttons"><a href="http://event.on24.com/eventRegistration/console/EventConsoleApollo.jsp?simulive=y&eventid=1498942&sessionid=1&username=&partnerref=&format=fhaudio&mobile=false&flashsupportedmobiledevice=false&helpcenter=false&key=3A12911539D711CAC159812BA42D71F8&text_language_id=en&playerwidth=1000&playerheight=650&overwritelobby=y&eventuserid=180099644&contenttype=A&mediametricsessionid=145331802&mediametricid=2150193&usercd=180099644&mode=launch" target="_blank">Click Here <span class="right-arrow"></span></a></div></div><div class="oj-sm-12 oj-xl-6 oj-xl-float-end"></div></div></div></div>',classname:'slide slide5' },
            { name: '<div class="verticalcentertext"><div class="verticalcentertextinner"><div class="heading">SE Excellence</div><div class="text">GSE Demos  with Jason</div><div class="buttons_c oj-rwow oj-flex"><div class="oj-sm-12 "><div class=" buttons"><a href="http://oukc.oracle.com/static12/opn/login/?t=checkusercookies%257Cr=-1%257Cc=2028346443" target="_blank">Click Here<span class="right-arrow"></span></a></div></div><div class="oj-sm-12 oj-xl-6 oj-xl-float-end"></div></div></div></div>',classname:'slide slide6' },
            { name: '<div class="verticalcentertext"><div class="verticalcentertextinner"><div class="heading">Add a New Slide</div><div class="buttons_c oj-rwow oj-flex"><div class="oj-sm-12 "><div class=" buttons">Edit</div></div><div class="oj-sm-12 oj-xl-6 oj-xl-float-end"></div></div></div></div>',classname:'slide slide7' }    
           
            
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
        self.slimage = ko.observableArray([]);
        openaddslidedialog = function () 
        {
            $("#addslidedialog").ojDialog("open");
            $.getJSON("https://apex.oraclecorp.com/pls/apex/training_app_dev/seaashm/homepage_image_get_all").
                then(function (imgid) {
                self.slimage([]);
                for (var l = 0; l < imgid.items.length; l++) {
                    self.slimage.push({
                            idimg: imgid.items[l].id,
                            source: imgid.items[l].images
                        })
                }
                // console.log(ko.toJSON(self.slimage()));
            });
        }
        closeaddslidedialog = function () {
            $("#addslidedialog").ojDialog("close");
        }
		
        openaddgltextdialog = function () {
            $("#addgltextdialog").ojDialog("open");
        }
        closeaddgltextdialog = function () {
            $("#addgltextdialog").ojDialog("close");
        }
		
        openaddnewrefdialog = function () {
            $("#addnewrefdialog").ojDialog("open");
        }
        closeaddnewrefdialog = function () {
            $("#addnewrefdialog").ojDialog("close");
        }

        openaddnewkeywinsdialog = function () {
            $("#addnewkeywinsdialog").ojDialog("open");
        }
        closeaddnewkeywinsdialog = function () {
            $("#addnewkeywinsdialog").ojDialog("close");
        }

        openaddnewefdialog = function () {
            $("#addnewefdialog").ojDialog("open");
        }
        closeaddnewefdialog= function () {
            $("#addnewefdialog").ojDialog("close");
        }

        openaddneworgdialog = function () {
            $("#addneworgdialog").ojDialog("open");
        }
        closeaddneworgdialog= function () {
            $("#addneworgdialog").ojDialog("close");
        }

        openorgpeopleimageuploder = function () {
            $("#orgpeopleimagedialog").ojDialog("open");
        }

        closeorgpeopleimageuploder = function () {
            $("#orgpeopleimagedialog").ojDialog("close");
        }

        clearContents = function(element){
            element.value = '';
        }
        // self.currentIcon = ko.observable("frameworkImage");

        // self.setModelCurrentIconToSvg = function () {
        //     alert("Set model currentIcon to svg.");
        //     self.currentIcon("svg");
        //     return true;
        // }
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new HomeViewModel();
  }
);
