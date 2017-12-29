/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
 
define(['ojs/ojcore', 'knockout',  'jquery','ojs/ojfilmstrip', 'ojs/ojpagingcontrol','ojs/ojradioset','ojs/ojtabs', 'ojs/ojconveyorbelt','ojs/ojbutton','ojs/ojpopup','ojs/ojdialog','ojs/ojanimation','ojs/ojselectcombobox','bootstrap', 'ojs/ojinputtext', 'ojs/ojcheckboxset', 'ojs/ojswitch'],
 function(oj, ko, $) {
  
    function HomeViewModel() {
        var self = this;

        // CHECK FOR ADMIN RIGHTS
        checkadminrights = function () {
            
            if (isAdmin) {
                console.log("Showing for admin");
                $(".admin").css("display", "inline-block");
            } else {
                console.log("Hiding for user");
                $(".admin").css("display", "none");
            }
        }


        checkadmin = function () {
            console.log("Admin check commencing for " + ssoemail);
            var checkurl = trainingbaseurl + "isAdmin";
            if (ssoemail.length > 0) {
                
                $.ajax({
                    url: checkurl,
                    method: 'GET',
                    headers: {
                        email: ssoemail
                    },
                    success: function (data) {
                        isAdmin = data.is_admin;
                        newUserAdminCheck = true;
                        checkadminrights();
                    },
                    error: function (xhr) {
                        //alert(xhr);
                        newUserAdminCheck = false;
                        checkadminrights();
                    }
                });
            } else {
                isAdmin=false;
                checkadminrights();
            }
        }
        
        //CREATE SLIDER observables
        self.slimage = ko.observableArray([]);
        self.slid = ko.observable('');
        self.sltitle = ko.observable('');
        self.sldescription = ko.observable('');
        self.slbuttonlabel1 = ko.observable('');
        self.slbuttonlabel2 = ko.observable('');
        self.sllinktext1 = ko.observable('');
        self.sllinktext2 = ko.observable('');
        self.slimgid = ko.observable('');
        self.sliderlist = ko.observableArray([]);

        //CREATE ORGANIZATION observables
        self.orgsel= ko.observable('');
        self.organization = ko.observableArray([]);
        self.organizationselected = ko.observable('');
        self.orgpeoplename = ko.observable('');
        self.orgpeopledesignation = ko.observable('');
        self.orgdottedline = ko.observable();
        self.organizationlist = ko.observableArray([]);
        self.organizationpeoplelist = ko.observableArray([]);
        self.organizationpeopleecalist = ko.observableArray([]);
        self.organizationpeoplepslist = ko.observableArray([]);
        self.organizationpeopleodlist = ko.observableArray([]);
        self.organizationpeopleseelist = ko.observableArray([]);
        self.organizationpeopleialist = ko.observableArray([]);
        self.organizationpeoplecshlist = ko.observableArray([]);
        self.organizationpeopleccslist = ko.observableArray([]);
        self.organizationpeoplehdwlist = ko.observableArray([]);

        //KEY DATES observables
        self.keydateslist= ko.observableArray([]);

        //KEY WINS observables
        self.kwlogo = ko.observableArray('');
        self.kwlink = ko.observable('');
        self.kwtext = ko.observable('');
        self.keywinslist = ko.observableArray([]);

        //GO LIVES observables
        self.gllogo = ko.observableArray('');
        self.glhostedby = ko.observable('');
        self.glguest = ko.observable('');
        self.gllink = ko.observable('');
        self.glhostphoto = ko.observable('');
        self.gldiscussion = ko.observable('');
        self.goliveslist = ko.observableArray([]);


        //REFERENCES observables
        self.refid = ko.observable('');
        self.reftype = ko.observable('');
        self.reflogo = ko.observableArray([]);
        self.reflink = ko.observable('');
        self.refcloudtype = ko.observable('');
        self.reflist = ko.observableArray([]);

        //EMPLOYEE FEATURES observables
        self.empfeatbg = ko.observableArray([]);
        self.empfeatheading = ko.observable('');
        self.empfeattext = ko.observable('');
        self.empfeatlist = ko.observableArray([]);

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
        };//console.log(ko.toJSON(self.sliderlist()));

        /******************************************SLIDER********************************************************************/

        idimage = function (event) 
        {
            self.slimgid(event);
        }
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

            if (self.sllinktext1().length == 0 && self.sllinktext2().length == 0) {

                alert("Please enter Banner 1st Link");
                return;
            }

            if (self.sllinktext2().length == 0) {
                alert("Please enter Banner 2nd Link");
                return;
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
                image_id: self.slimgid()
            }

            // console.log(self.slimage());
            // console.log(ko.toJSON(sl));

            $.ajax({
                url: homedevurl+'home_screen_data',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(sl),
                success: function (sldata) {
                    // alert("slider data uploaded");
                    fetchslider();
                    closeaddslidedialog();
                    resetslide();
                }
            }).fail(function (xhr, textStatus, err) {
                alert(err);
            });
        }

        //EDIT SLIDER observables
        self.editslimage = ko.observableArray([]);
        self.editslimgid = ko.observable('');
        self.editslid = ko.observable('');
        self.editsltitle = ko.observable('');
        self.editsldescription = ko.observable('');
        self.editslbuttonlabel1 = ko.observable('');
        self.editslbuttonlabel2 = ko.observable('');
        self.editsllinktext1 = ko.observable('');
        self.editsllinktext2 = ko.observable('');
        self.editsliderlist = ko.observableArray([]);
            
        editslider = function (edit_slider, param2) 
        {
            self.editslimage([]);
            self.editslimgid('');
            self.editslid('');
            self.editsltitle('');
            self.editsldescription('');
            self.editslbuttonlabel1('');
            self.editslbuttonlabel2('');
            self.editsllinktext1('');
            self.editsllinktext2('');

            // SET NEW VALUE
            self.editslimgid(edit_slider.sliderimgid);
            self.editslimage(edit_slider.sliderimg);
            self.editslid(edit_slider.sliderid);
            self.editsltitle(edit_slider.slidertitle);
            self.editsldescription(edit_slider.sliderdesc);
            self.editslbuttonlabel1(edit_slider.sliderbl1);
            self.editslbuttonlabel2(edit_slider.sliderbl2);
            self.editsllinktext1(edit_slider.sliderlt1);
            self.editsllinktext2(edit_slider.sliderlt2);
            $("#editslidedialog").ojDialog("open");
            $.getJSON(homedevurl+"homepage_image_get_all").
                then(function (imgid) {
                self.slimage([]);
                for (var l = 0; l < imgid.items.length; l++) {
                    self.slimage.push({
                            idimg: imgid.items[l].id,
                            source: imgid.items[l].images
                        })
                }//console.log(ko.toJSON(self.slimage()));
            });
        }

        editslidervalues = function () {

            var edit_slider_data = {
                id: self.editslid(),
                title: self.editsltitle(),
                description: self.editsldescription(),
                button_label1: self.editslbuttonlabel1(),
                button_label2:self.editslbuttonlabel2(),
                link_text1: self.editsllinktext1(),
                link_text2: self.editsllinktext2(),
                image_id: self.editslimgid()
            }
            console.log("editing slider data : "+ko.toJSON(edit_slider_data));
            $.ajax({
                url: homedevurl+'home_screen_data',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(edit_slider_data),
                success: function (data) {
                    fetchslider();
                    closeaddslidedialog();
                    $("#editslidedialog").ojDialog("close");
                    resetslide();
                },fail: function (xhr, textStatus, err) {
                        console.log("failed"+err);
                    },
                    error: function (xhr, textStatus, err) {
                        console.log("error"+err);
                    }
            });// $("#editslidedialog").ojDialog("close");
        }

        deleteslider = function (slider_delete) 
        {
            console.log("Deleted Slider",slider_delete);
            openDeleteSliderModal(slider_delete.sliderid);
        }

        openDeleteSliderModal = function (delete_slider_id) {
            console.log("deleting id-"+delete_slider_id);
            var data_sl_value = {
                "id" : delete_slider_id
            };
            $("#delete_slider").ojDialog("open");
            $("#delete_carousel").click(function()
            {
                $.ajax({
                    url: homedevurl+'home_screen_data',
                    method: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(data_sl_value),
                    success: function () {
                        closeDeleteSliderModal();
                        console.log("delete success for slider");
                        fetchslider();
                    },
                    fail: function (xhr, textStatus, err) {
                        console.log(err);
                    },
                    error: function (xhr, textStatus, err) {
                        console.log(err);
                    }
                });
            });

        }

        closeDeleteSliderModal = function () {
            $("#delete_slider").ojDialog("close");
        }

        fetchslider = function () 
        {
            $.getJSON(homedevurl+'home_screen_data').then(function (fetchslider) 
            {
                // Fetch organization people details
                self.sliderlist([]);
                var sllist = fetchslider.items;
                for (var s = 0; s < sllist.length; s++) 
                {
                    if(sllist[s].link_text1 == "" && sllist[s].button_label1 == "")
                    {
                        $(".bl1").css("display","none");
                    }
                    else if(sllist[s].link_text2 == "" && sllist[s].button_label2 == "")
                    {
                        $(".bl2").css("display","none");
                    }
                    self.sliderlist.push({
                        sliderbl1: sllist[s].button_label1,
                        sliderbl2: sllist[s].button_label2,
                        sliderdesc: sllist[s].description,
                        sliderid: sllist[s].id,
                        sliderimgid: sllist[s].image_id,
                        sliderimg: sllist[s].image,
                        sliderlt1: sllist[s].link_text1,
                        sliderlt2: sllist[s].link_text2,
                        slidertitle: sllist[s].title
                    })
                }//console.log("sdsdsd",ko.toJSON(self.sliderlist()));
            });
        }
        fetchslider();

        resetslider = function (){
             self.slid('');
             self.sltitle('');
             self.sldescription('');
             self.slbuttonlabel1('');
             self.slbuttonlabel2('');
             self.sllinktext1('');
             self.sllinktext2('');
             self.slimgid('');
        }

        /******************************************SLIDER ENDS********************************************************************/
        
        /******************************************OUR ORGANIZATION***************************************************************/

        $.getJSON(homedevurl+'GETORGLOV').then(function (orgtypes) 
        {
            // Get Organization type in select in ADD ORGANIZATION
            self.organizationlist([]);
            var orglist = orgtypes.items;
            for (var b = 0; b < orglist.length; b++) 
            {
                self.organizationlist.push({
                    orgname: orglist[b].org_name
                })
            }
        });

        uploadorgpeopleimage = function (event, ui) 
        {
            addorgdialog(ui.value);
        }
        var employeephotopath = "";
        imageselected = function (event)
        {
            employeephotopath = event.target.files[0];
            console.log("filename for photo of employee added",employeephotopath.name);
        }
        addorgdialog = function () //ORGANIZATION people add
        {
            var reader = new FileReader();
            reader.onload = function () {
              self.organizationselected(self.orgsel()[0]);
              var uploadheader = {
                "organization": self.organizationselected(),
                "name": self.orgpeoplename(),
                "designation": self.orgpeopledesignation(),
                "dot_line": self.orgdottedline()!=true?'No':'Yes',
                "mimetype": employeephotopath.type
                }

              var imagedata = reader.result.split('base64,')[1];// console.log(uploadheader,reader.result);
              // SEND TO SERVER
              $.ajax({
                url: homedevurl+'employee_data/',
                headers: uploadheader,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: imagedata,
                success: function (dataorg) {
                  console.log("Organization people added successfully!");
                  fetchpeopleorg();
                  closeaddneworgdialog();
                  resetorg();
                }
              }).fail(function (xhr, textStatus, err) {
                alert(err);
              });
            };
            reader.readAsDataURL(employeephotopath);
        };

        //EDIT ORGANIZATION observables
        self.editorgsel = ko.observable('');
        self.editorganizationid = ko.observable('');
        self.editorganizationselected = ko.observable('');
        self.editorgpeoplename = ko.observable('');
        self.editorgpeopledesignation = ko.observable('');
        self.editorgdottedline = ko.observable('');
        self.editorgimage = ko.observable('');

        edituploadorgpeopleimage = function (event) 
        {
            editorgdialog(event);
        }
        var edemployeephotopath = "";
        editimageselected = function (event)
        {
            edemployeephotopath = event.target.files[0];
            console.log("filename for photo of edit org",edemployeephotopath);
        }
        editorgdialog = function (edit_org, param2) 
        {
            self.editorgsel('');
            self.editorganizationid('');
            self.editorganizationselected('');
            self.editorgpeoplename('');
            self.editorgpeopledesignation('');
            self.editorgdottedline('');
            self.editorgimage('');

            console.log("filename for edit organization",edemployeephotopath);
            // SET NEW VALUE
            self.editorganizationid(edit_org.orgempid);
            self.editorganizationselected(edit_org.orglob);
            self.editorgpeoplename(edit_org.orgname);
            self.editorgpeopledesignation(edit_org.orgdesig);
            self.editorgdottedline(edit_org.orgdotline);
            self.editorgimage(edit_org.orgimage);
            
            $("#editorgdialog").ojDialog("open");
            var edit_org_data = {
                orgempid: self.editorganizationid(),
                orglob: self.editorganizationselected(),
                orgname: self.editorgpeoplename(),
                orgdesig: self.editorgpeopledesignation(),
                orgdotline: self.editorgdottedline(),
                orgimage: self.editorgimage()
            }

            console.log("edit organization data: "+ko.toJSON(edit_org_data));

            var orgedreader = new FileReader();
            orgedreader.onload = function () {
                self.editorganizationselected(self.editorgsel()[0]);
                var uploadorgedheader = {
                    "organization": self.editorganizationselected(),
                    "name": self.editorgpeoplename(),
                    "designation": self.editorgpeopledesignation(),
                    "dot_line": self.editorgdottedline()!=true?'No':'Yes',
                    "mimetype": edemployeephotopath.type
                }

                var imageorgeddata = orgedreader.result.split('base64,')[1];

                console.log(uploadorgedheader,orgedreader.result);
              // SEND TO SERVER
              $.ajax({
                url: homedevurl+'employee_data/',
                headers: uploadorgedheader,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: imageorgeddata,
                success: function (dataorg) {
                  alert("Organization people edited successfully!");
                  fetchpeopleorg();
                }
              }).fail(function (xhr, textStatus, err) {
                alert(err);
              });
            };
            orgedreader.readAsDataURL(edemployeephotopath);
            $("#editorgdialog").ojDialog("close");
        }
        deleteorg = function (org_delete) 
        {
            console.log("deleted organization data: ",org_delete);
            openDeleteOrganizationModal(org_delete.orgempid);
        }

        openDeleteOrganizationModal = function (delete_org_id) {
            console.log("deleting id organization - "+delete_org_id);
            var data_org_value = {
                "id" : delete_org_id
            };
            $("#delete_organization").ojDialog("open");
            $("#delete_org").click(function()
            {
                $.ajax({
                    url: homedevurl+'employee_data/',
                    method: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(data_org_value),
                    success: function () {
                        closeDeleteOrganizationModal();
                        alert("delete success for organization");
                        fetchpeopleorg();
                        resetorg();
                    },
                    fail: function (xhr, textStatus, err) {
                        console.log(err);
                    },
                    error: function (xhr, textStatus, err) {
                        console.log(err);
                    }
                });
            });

        }

        closeDeleteOrganizationModal = function () {
            $("#delete_organization").ojDialog("close");
        }

        fetchpeopleorg = function () 
        {
            $.getJSON(homedevurl+'employee_data/').then(function (orgpeopledetails) 
            {
                // Fetch organization people details
                self.organizationpeopleecalist([]);
                self.organizationpeoplepslist([]);
                self.organizationpeopleodlist([]);
                self.organizationpeopleseelist([]);
                self.organizationpeopleialist([]);
                self.organizationpeoplecshlist([]);
                self.organizationpeopleccslist([]);
                self.organizationpeoplehdwlist([]);
                var orgplist = orgpeopledetails.items;
                for (var b = 0; b < orgplist.length; b++) 
                {
                    switch (orgplist[b].organization) 
                    {
                        case "Enterprise Cloud Architect":
                            self.organizationpeopleecalist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line
                            })
                            break;
                        case "Platform Specialist":
                            self.organizationpeoplepslist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line
                            })
                            break;
                        case "Oracle Digital":
                            self.organizationpeopleodlist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line
                            })
                            break;
                        case "SE Excellence":
                            self.organizationpeopleseelist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line
                            })
                            break;
                        case "Industry Advisors":
                            self.organizationpeopleialist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line
                            })
                            break;
                        case "Cloud Solution Hubs":
                            self.organizationpeoplecshlist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line
                            })
                            break;
                        case "Cloud Customer Success":
                            self.organizationpeopleccslist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line
                            })
                            break;
                        case "Hardware":
                            self.organizationpeoplehdwlist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line
                            })
                            break;
                    }
                }
            });
        }
        fetchpeopleorg();

        resetorg = function (){
            self.organizationselected('');
            self.orgpeoplename('');
            self.orgpeopledesignation('');
            self.orgdottedline('');
            document.getElementById("input-1").value = "";
            // $("#basicSelect").ojSelect("reset"); 
        }
        /******************************************OUR ORGANIZATION ENDS*****************************************************/
        
        /******************************************KEY DATES*****************************************************/
        fetchkeydates = function () 
        {
            $.getJSON(homeprodurl+'KeyDates').then(function (keydatesdetails) 
            {
                var homelink = window.location.href;
                homelink += "?root=training#";
                self.keydateslist([]);
                var stdate,kstdate,endate,kendate;
                var kdlist = keydatesdetails.items;
                for (var b = 0; b < kdlist.length; b++) 
                {
                    kstdate = kdlist[b].start_date != undefined ? kdlist[b].start_date.split('T')[0] : '';
                    stdate = new Date(kstdate);
                    kendate = kdlist[b].end_date != undefined ? kdlist[b].end_date.split('T')[0] : '';
                    endate = new Date(kendate);
                    self.keydateslist.push({
                        keydcid: kdlist[b].course_id,
                        keydtype: kdlist[b].type,
                        keydname: kdlist[b].name,
                        keydhlink: homelink,
                        keydstartdate: stdate.toDateString(),
                        keydstarttime: kdlist[b].start_date != undefined ? kdlist[b].start_date.substring(11, 19) + " PT" : '',
                        keydenddate: endate.toDateString(),
                        keydendtime: kdlist[b].end_date != undefined ? kdlist[b].end_date.substring(11, 19) + " PT" : ''
                    })
                }//console.log(ko.toJSON(self.keydateslist()));
            });
        }
        fetchkeydates();

        /******************************************KEY DATES ENDS*****************************************************/

        /******************************************KEY WINS******************************************************************/

        var akwlogopath = "";
        akwlogoselected = function (event)
        {
            akwlogopath = event.target.files[0];
            console.log("add key logo filename",akwlogopath);
        }
        addkeywins = function () 
        {
            if (self.kwlink().length == 0) {
                alert("Please enter Key Wins Link");
                return;
            }

            if (self.kwtext().length == 0) {
                alert("Please enter Key Wins Text");
                return;
            }

            var akwreader = new FileReader();
            akwreader.onload = function () {
              var uploadakwheader = {
                "text": self.kwtext(),
                "link": self.kwlink(),
                "mimetype": akwlogopath.type
                }

              var akwimagedata = akwreader.result.split('base64,')[1];

              console.log(uploadakwheader,akwreader.result);
              // SEND TO SERVER
              $.ajax({
                url: homedevurl+'KeyWins',
                headers: uploadakwheader,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: akwimagedata,
                success: function (dataakw) {
                  console.log(dataakw);
                  alert("Key Wins added successfully!");
                  fetchkeywins();
                  closeaddnewkeywinsdialog();
                  resetkeywins();
                }
              }).fail(function (xhr, textStatus, err) {
                alert(err);
              });
            };
            akwreader.readAsDataURL(akwlogopath);
        }

        //EDIT KEY WINS observables
        self.editkwid = ko.observable('');
        self.editkwlogo = ko.observable('');
        self.editkwlink = ko.observable('');
        self.editkwtext = ko.observable('');
            
        var ekwlogopath = "";
        ekwlogoselected = function (event)
        {
            ekwlogopath = event.target.files[0];
            console.log("add key logo filename",ekwlogopath);
        }

        editkeywins = function (keywins_edit) 
        {
            console.log("Edit key wins data",keywins_edit);
            openEditKeyWinsModal(keywins_edit);
        }

        openEditKeyWinsModal = function (edit_kw, param2) 
        {
            self.editkwid('');
            self.editkwlogo('');
            self.editkwlink('');
            self.editkwtext('');

            // SET NEW VALUE
            self.editkwid(edit_kw.keywid);
            self.editkwlogo(edit_kw.keywphoto);
            self.editkwlink(edit_kw.keywlink);
            self.editkwtext(edit_kw.keywtext);
            
            $("#editkeywinsdialog").ojDialog("open");
            var edit_keywins_data = {
                id: self.editkwid(),
                image: self.editkwlogo(),
                link: self.editkwlink(),
                text: self.editkwtext()
            }

            console.log("edit key wins data: "+ko.toJSON(edit_keywins_data));
            if(ekwlogopath.length == 0)
            {
                var uploadekwheader = {
                "text": self.kwtext(),
                "link": self.kwlink()
                }

              // SEND TO SERVER
              $.ajax({
                url: homedevurl+'KeyWins',
                headers: uploadekwheader,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                success: function (dataakw) {
                    console.log("edit success for keywins");
                    fetchkeywins();
                }
              }).fail(function (xhr, textStatus, err) {
                alert(err);
              });
            }
            else
            {
                var ekwreader = new FileReader();
                ekwreader.onload = function () {
                  var uploadekwheader = {
                    "text": self.kwtext(),
                    "link": self.kwlink(),
                    "mimetype": ekwlogopath.type
                    }

                  var ekwimagedata = ekwreader.result.split('base64,')[1];

                  console.log(uploadekwheader,ekwreader.result);
                  // SEND TO SERVER
                  $.ajax({
                    url: homedevurl+'KeyWins',
                    headers: uploadekwheader,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ekwimagedata,
                    success: function (dataakw) {
                        console.log("edit success for keywins");
                        fetchkeywins();
                    }
                  }).fail(function (xhr, textStatus, err) {
                    alert(err);
                  });
                };
                ekwreader.readAsDataURL(ekwlogopath);
            }            
            $("#editkeywinsdialog").ojDialog("close");
        }

        deletekeywins = function (keywins_delete) 
        {
            console.log("delete key wins",keywins_delete);
            openDeleteSKeyWinsModal(keywins_delete.keywid);
        }

        openDeleteSKeyWinsModal = function (delete_keywins_id) {
            console.log("deleting id key win - "+delete_keywins_id);
            var data_kw_value = {
                "id" : delete_keywins_id
            };
            $("#delete_keywins").ojDialog("open");
            $("#delete_kw").click(function()
            {
                $.ajax({
                    url: homedevurl+'KeyWins',
                    method: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(data_kw_value),
                    success: function () {
                        closeDeleteSKeyWinsModal();
                        console.log("delete success for key wins");
                        fetchkeywins();
                    },
                    fail: function (xhr, textStatus, err) {
                        console.log(err);
                    },
                    error: function (xhr, textStatus, err) {
                        console.log(err);
                    }
                });
            });

        }

        closeDeleteSKeyWinsModal = function () {
            $("#delete_keywins").ojDialog("close");
        }

        fetchkeywins = function () 
        {
            $.getJSON(homedevurl+'KeyWins').then(function (keywinsdetails) 
            {
                // Fetch key wins details
                self.keywinslist([]);
                var kwlist = keywinsdetails.items;
                for (var b = 0; b < kwlist.length; b++) 
                {
                    self.keywinslist.push({
                        keywid: kwlist[b].id,
                        keywlink: kwlist[b].link,
                        keywtext: kwlist[b].text,
                        keywphoto: kwlist[b].image
                    })
                }//console.log(ko.toJSON(self.keywinslist()));
            });
        }
        fetchkeywins();

        resetkeywins = function (){
            self.kwlink('');
            self.kwtext('');
            document.getElementById("kwlogoupl").value = "";
            // $("#basicSelect").ojSelect("reset"); 
        }
        /******************************************KEY WINS ENDS********************************************************************/

        /******************************************GO LIVES*************************************************************************/

        var gllogopath = "";
        gllogoselected = function (event)
        {
            gllogopath = event.target.files[0];
            console.log("add go lives logo filename",gllogopath);
        }
        glphotoselected = function (event)
        {
            glphotopath = event.target.files[0];
            console.log("add go lives photo filename",glphotopath);
        }
        uploadlogogl = function (lheader,ldata)
        {
          $.ajax({
            url: homedevurl+'GoLives',
            headers: lheader,
            cache: false,
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            data: ldata,
            success: function (datalogogl) {
              console.log(datalogogl);
              alert("Go Lives logo added successfully!");
              fetchgolives();
            }
          }).fail(function (xhr, textStatus, err) {
            alert(err);
          });
        }
        uploadphotogl = function (pheader,pdata)
        {
          $.ajax({
            url: homedevurl+'GoLives',
            headers: pheader,
            cache: false,
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            data: pdata,
            success: function (dataphotogl) {
              console.log(dataphotogl);
              alert("Go Lives presenter photo added successfully!");
              fetchgolives();
            }
          }).fail(function (xhr, textStatus, err) {
            alert(err);
          });
        }
        addgolives = function () 
        {
            if (self.glhostedby().length == 0) {
                alert("Please enter Go Lives Host Person");
                return;
            }

            if (self.glguest().length == 0) {
                alert("Please enter Go Lives Guest");
                return;
            }

            if (self.gllink().length == 0) {
                alert("Please enter Go Lives Link");
                return;
            }

            if (self.gldiscussion().length == 0) {
                alert("Please enter Go Lives Summary");
                return;
            }

            var glheader = {
                hosted_by: self.glhostedby(),
                episode_guest: self.glguest(),
                link: self.gllink(),
                go_live_description: self.gldiscussion()
            }
            console.log(ko.toJSON(glheader));

            $.ajax({
                url: homedevurl+'GoLives',
                headers: glheader,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                success: function (gldata) {
                    console.log(ko.toJSON(gldata));
                    alert("go lives data uploaded");

                    //Logo Upload
                    var glreader = new FileReader();
                    glreader.onload = function () 
                    {
                      var uploadglheader = {
                        "id": gldata.items.id,
                        "logo_or_bg": "logo",
                        "mimetype": gllogopath.type
                        }

                      var gllogodata = glreader.result.split('base64,')[1];

                      console.log(uploadglheader,glreader.result);
                      // SEND TO SERVER
                      uploadlogogl(uploadglheader,gllogodata);
                    };
                    glreader.readAsDataURL(gllogopath);

                    //Photo Upload
                    var glpreader = new FileReader();
                    glpreader.onload = function () 
                    {
                      var uploadglpheader = {
                        "id": gldata.items.id,
                        "logo_or_bg": "background",
                        "mimetype": glphotopath.type
                        }

                      var glphotodata = glpreader.result.split('base64,')[1];

                      console.log(uploadgpheader,glpreader.result);
                      // SEND TO SERVER

                      uploadphotogl(uploadgpheader,glphotodata);
                    };
                    glpreader.readAsDataURL(glphotopath);
                    closeaddgltextdialog()
                }
            }).fail(function (xhr, textStatus, err) {
                alert(err);
            });
        }

        // deletegolives = function (golives_delete) 
        // {
        //     console.log("fsdfsd",golives_delete);
        //     openDeleteGoLivesModal(golives_delete.id);
        // }

        // openDeleteGoLivesModal = function (delete_golives_id) {
        //     console.log("deleting id go lives - "+delete_golives_id);
        //     var data_gl_value = {
        //         "id" : delete_golives_id
        //     };
        //     $("#delete_golives").ojDialog("open");
        //     $("#delete_gl").click(function()
        //     {
        //         $.ajax({
        //             url: homedevurl+'GoLives',
        //             method: 'DELETE',
        //             contentType: 'application/json; charset=utf-8',
        //             data: ko.toJSON(data_gl_value),
        //             success: function () {
        //                 closeDeleteGoLivesModal();
        //                 console.log("delete success for go lives");
        //                 fetchgolives();
        //             },
        //             fail: function (xhr, textStatus, err) {
        //                 console.log(err);
        //             },
        //             error: function (xhr, textStatus, err) {
        //                 console.log(err);
        //             }
        //         });
        //     });

        // }

        // closeDeleteGoLivesModal = function () {
        //     $("#delete_golives").ojDialog("close");
        // }

        fetchgolives = function () 
        {
            $.getJSON(homedevurl+'GoLives').then(function (golivesdetails) 
            {
                // Fetch go lives details
                self.goliveslist([]);
                var gllist = golivesdetails.items;
                for (var b = 0; b < gllist.length; b++) 
                {
                    self.goliveslist.push({
                        golid: gllist[b].id,
                        golhostedby: gllist[b].hosted_by,
                        golguest: gllist[b].episode_guest,
                        gollink: gllist[b].link,
                        goldescription: gllist[b].go_live_description,
                        golbackground: gllist[b].background,
                        gollogo: gllist[b].logo,
                    })
                }// console.log(ko.toJSON(self.goliveslist()));
            });
        }
        fetchgolives();
        /******************************************GO LIVES END********************************************************************/

         /******************************************REFERENCES*************************************************************************/

        var reflogopath = "";
        reflogoselected = function (event)
        {
            reflogopath = event.target.files[0];
            console.log("add references logo iaas filename",reflogopath);
        }
        addreferences = function () 
        {
            var refreader = new FileReader();
            refreader.onload = function () {
              var uploadrefheader = {
                "type": 'IAAS',
                "reference_link": self.reflink(),
                "logo_mimetype": reflogopath.type
                }

              var arefimagedata = refreader.result.split('base64,')[1];

              // SEND TO SERVER
              $.ajax({
                url: homedevurl+'Reference',
                headers: uploadrefheader,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: arefimagedata,
                success: function (dataref) {
                    fetchreferences();
                    closeaddnewrefdialog();
                    resetreferences();
                }
              }).fail(function (xhr, textStatus, err) {
                alert(err);
              });
            };
            refreader.readAsDataURL(reflogopath);
        }

        var reflogopathpass = "";
        reflogoselectedpass = function (event) {
            reflogopathpass = event.target.files[0];
            console.log("add references logo paas filename", reflogopathpass);
        }
        addreferencespaas = function () {
            var refreaderpass = new FileReader();
            refreaderpass.onload = function () {
                var uploadrefheaderpass = {
                    "type": 'PAAS',
                    "reference_link": self.reflink(),
                    "logo_mimetype": reflogopathpass.type
                }

                var arefimagedatapaas = refreaderpass.result.split('base64,')[1];
                
                // SEND TO SERVER
                $.ajax({
                    url: homedevurl + 'Reference',
                    headers: uploadrefheaderpass,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: arefimagedatapaas,
                    success: function (datarefpaas) {
                        // alert("References added successfully!");
                        fetchreferences();
                        closeaddnewrefdialogpaas();
                        resetreferences();
                    }
                }).fail(function (xhr, textStatus, err) {
                    alert(err);
                });
            };
            refreaderpass.readAsDataURL(reflogopathpass);
        }

        //EDIT REFERENCES observables
        self.editrefid = ko.observable('');
        self.editreftype = ko.observable('');
        self.editreflogo = ko.observable('');
        self.editreflink = ko.observable('');

        var edreflogopath = "";
        editreflogoselected = function (event) {
            edreflogopath = event.target.files[0];
            console.log("filename for logo of edit refrences", edreflogopath);
            console.log("edit refrences filename length ", edreflogopath.length);
            $("#edreflog").replaceWith($("#edreflog").val('').clone(true));
        }
        editreferencesdialog = function () 
        {
            var edit_ref_data = {
                refid: self.editrefid(),
                reftype: self.editreftype(),
                reflink: self.editreflink(),
                reflogo: self.editreflogo()
            }

            console.log("edit references data: " + ko.toJSON(edit_ref_data));
            if (edreflogopath.length == 0) 
            {
                var uploadrefedheader = {
                    "id": self.editrefid(),
                    "type": self.editreftype(),
                    "reference_link": self.editreflink()
                }

                // SEND TO SERVER
                $.ajax({
                    url: homedevurl + 'Reference',
                    headers: uploadrefedheader,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    success: function (dataedref) {
                        alert("Refrences edited successfully!");
                        fetchreferences();
                        closeReferencesModal();
                        resetreferences();
                    }
                }).fail(function (xhr, textStatus, err) {
                    alert(err);
                });
            }
            else
            {
                var edrefreader = new FileReader();
                edrefreader.onload = function () 
                {
                    var uploadrefedheader = 
                    {
                        "id": self.editrefid(),
                        "type": self.editreftype(),
                        "reference_link": self.editreflink(),
                        "logo_mimetype": edreflogopath.type
                    }

                    var edarefimagedata = edrefreader.result.split('base64,')[1];

                    // SEND TO SERVER
                    $.ajax({
                        url: homedevurl + 'Reference',
                        headers: uploadrefedheader,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: edarefimagedata,
                        success: function (dataedref) {
                            alert("Refrences edited successfully!");
                            fetchreferences();
                            closeReferencesModal();
                            resetreferences();
                        }
                    }).fail(function (xhr, textStatus, err) {
                        alert(err);
                    });
                };
                edrefreader.readAsDataURL(edreflogopath);
            }
        }

        openReferencesModal = function (edit_ref) {
            $("#editrefdialog").ojDialog("open");
            console.log(edit_ref);
            self.editrefid('');
            self.editreftype('');
            self.editreflogo('');
            self.editreflink('');

            // SET NEW VALUE
            self.editrefid(edit_ref.refid);
            self.editreftype(edit_ref.reftype);
            self.editreflogo(edit_ref.reflogo);
            self.editreflink(edit_ref.reflink);
        }
        closeReferencesModal = function () {
            $("#editrefdialog").ojDialog("close");
        }

        var edpaasreflogopath = "";
        edreflogoselectedpass = function (event) {
            edpaasreflogopath = event.target.files[0];
            console.log("filename for logo of edit refrences", edpaasreflogopath);
            console.log("edit refrences filename length ", edpaasreflogopath.length);
            $("#edreflogpass").replaceWith($("#edreflogpass").val('').clone(true));
        }
        editreferencespaasdialog = function () {
            var edit_ref_data = {
                refid: self.editrefid(),
                reftype: self.editreftype(),
                reflink: self.editreflink(),
                reflogo: self.editreflogo()
            }

            console.log("edit references data: " + ko.toJSON(edit_ref_data));
            if (edpaasreflogopath.length == 0) {
                var uploadrefedheader = {
                    "id": self.editrefid(),
                    "type": self.editreftype(),
                    "reference_link": self.editreflink()
                }

                // SEND TO SERVER
                $.ajax({
                    url: homedevurl + 'Reference',
                    headers: uploadrefedheader,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    success: function (dataedref) {
                        alert("Refrences edited successfully!");
                        fetchreferences();
                        closeReferencesPaasModal();
                        resetreferences();
                    }
                }).fail(function (xhr, textStatus, err) {
                    alert(err);
                });
            }
            else {
                var edpaasrefreader = new FileReader();
                edpaasrefreader.onload = function () {
                    var uploadrefedheader =
                        {
                            "id": self.editrefid(),
                            "type": self.editreftype(),
                            "reference_link": self.editreflink(),
                            "logo_mimetype": edpaasreflogopath.type
                        }

                    var edpaasarefimagedata = edpaasrefreader.result.split('base64,')[1];

                    // SEND TO SERVER
                    $.ajax({
                        url: homedevurl + 'Reference',
                        headers: uploadrefedheader,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: edpaasarefimagedata,
                        success: function (dataedref) {
                            alert("Refrences edited successfully!");
                            fetchreferences();
                            closeReferencesPaasModal();
                            resetreferences();
                        }
                    }).fail(function (xhr, textStatus, err) {
                        alert(err);
                    });
                };
                edpaasrefreader.readAsDataURL(edpaasreflogopath);
            }
        }

        openReferencesPaasModal = function (edit_ref) {
            $("#editnewrefdialogpaas").ojDialog("open");
            console.log(edit_ref);
            self.editrefid('');
            self.editreftype('');
            self.editreflogo('');
            self.editreflink('');

            // SET NEW VALUE
            self.editrefid(edit_ref.refid);
            self.editreftype(edit_ref.reftype);
            self.editreflogo(edit_ref.reflogo);
            self.editreflink(edit_ref.reflink);
        }
        closeReferencesPaasModal = function () {
            $("#editnewrefdialogpaas").ojDialog("close");
        }


        deletereferences = function (ref_delete) 
        {
            console.log("delete reference",ref_delete);
            openDeleteReferencesModal(ref_delete.refid);
        }

        openDeleteReferencesModal = function (delete_ref_id) {
            console.log("deleting id reference - "+delete_ref_id);
            var data_ref_value = {
                "id" : delete_ref_id
            };
            $("#delete_references").ojDialog("open");
            $("#delete_ref").click(function()
            {
                $.ajax({
                    url: homedevurl+'Reference',
                    method: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(data_ref_value),
                    success: function () {
                        console.log("delete success for references");
                        closeDeleteReferencesModal();
                        fetchreferences();
                    },
                    fail: function (xhr, textStatus, err) {
                        console.log(err);
                    },
                    error: function (xhr, textStatus, err) {
                        console.log(err);
                    }
                });
            });

        }

        closeDeleteReferencesModal = function () {
            $("#delete_references").ojDialog("close");
        }

        fetchreferences = function () 
        {
            $.getJSON(homedevurl+'Reference').then(function (referencesdetails) 
            {
                // Fetch references details
                self.reflist([]);
                var relist = referencesdetails.items;
                for (var b = 0; b < relist.length; b++) 
                {
                    self.reflist.push({
                        refid: relist[b].id,
                        reftype: relist[b].type,
                        reflink: relist[b].reference_link,
                        reflogo: relist[b].image
                    })
                }// console.log(ko.toJSON(self.reflist()));
            });
        }
        fetchreferences();

        resetreferences = function (){
            self.reflink('');
            document.getElementById("reflog").value = "";
        }

        /******************************************REFERENCES ENDS********************************************************************/        /******************************************EMPLOYEE FEATURES*************************************************************************/

        // var empphotopath = "";
        // empphotoselected = function (event)
        // {
        //     empphotopath = event.target.files[0];
        //     console.log("add references logo filename",empphotopath);
        // }
        // self.addempfeatures = function () 
        // {
        //     if (self.empfeatheading().length == 0) {
        //         alert("Please enter Employee Features Heading");
        //         return;
        //     }

        //     if (self.empfeattext().length == 0) {
        //         alert("Please enter Employee Features Text");
        //         return;
        //     }

        //     var efreader = new FileReader();
        //     reader.onload = function () {
        //       var uploadefheader = {
        //         "efheading": self.empfeatheading(),
        //         "eftext": self.empfeattext(),
        //         "efbg": empphotopath.type
        //         }

        //       var empfimagedata = efreader.result.split('base64,')[1];

        //       console.log(uploadefheader,efreader.result);
        //       // SEND TO SERVER
        //       $.ajax({
        //         url: homedevurl+'employee_data/',
        //         headers: uploadefheader,
        //         cache: false,
        //         type: 'POST',
        //         contentType: 'application/json; charset=utf-8',
        //         data: empfimagedata,
        //         success: function (dataempfeat) {
        //           console.log(dataempfeat);
        //           alert("Employee Features added successfully!");
        //         }
        //       }).fail(function (xhr, textStatus, err) {
        //         alert(err);
        //       });
        //     };
        //     efreader.readAsDataURL(empphotopath);
        // }

        // fetchempfeatures = function () 
        // {
        //     $.getJSON(homedevurl+'employee_data/').then(function (employeefeaturesdetails) 
        //     {
        //         // Fetch Employee features
        //         self.empfeatlist([]);
        //         var eflist = employeefeaturesdetails.items;
        //         for (var b = 0; b < eflist.length; b++) 
        //         {
        //             self.empfeatlist.push({
        //                 empfeaheading: eflist[b].efheading,
        //                 empfeatext: eflist[b].eftext,
        //                 empfeabg: eflist[b].efbg
        //             })
        //         }// console.log(ko.toJSON(self.empfeatlist()));
        //     });
        // }
        // fetchempfeatures();

        /******************************************EMPLOYEE FEATURES ENDS********************************************************************/

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
     
        setcolor = function(){
            return "yes";
        } 

        $(document).ready(function() 
        {
	    if (window.location.href.indexOf("waleed") != -1)
            {
	       $("#empf1").ojDialog("open");
	    }
	    else if (window.location.href.indexOf("chris") != -1)
            {
	       $("#empf2").ojDialog("open");
	    }
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
            // Add smooth scrolling to all links
            $('#setupBar a[href^="#"]').on('click', function(e) {

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
	  /* Remove active class on any li when an anchor is clicked */
    
    $('#setupBar ul').children().removeClass();
    
    /* Add active class to clicked anchor's parent li */
        
    $(this).parent().addClass('active');
    } // End if
  });
  
        });
		
		  $(document).ready(function() { 
      $('#myCarousel').carousel({ interval: 5000, cycle: true });
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
        openaddslidedialog = function () 
        {
            $("#addslidedialog").ojDialog("open");
            $.getJSON(homedevurl+"homepage_image_get_all").
                then(function (imgid) {
                self.slimage([]);
                for (var l = 0; l < imgid.items.length; l++) {
                    self.slimage.push({
                            idimg: imgid.items[l].id,
                            source: imgid.items[l].images
                        })
                }// console.log(ko.toJSON(self.slimage()));
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

        openaddnewrefdialogpaas = function () {
            $("#addnewrefdialogpaas").ojDialog("open");
        }
        closeaddnewrefdialogpaas = function () {
            $("#addnewrefdialogpaas").ojDialog("close");
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

        

        self.handleActivated = function(info) {
            checkadmin();
            checkadminrights();
            // alert("loaded!");
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
