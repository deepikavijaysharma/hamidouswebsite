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
        self.checkadminrightsnew = function () 
        {
            var checkurl = trainingbaseurl + "isAdmin";
            if (ssoemail.length > 0) 
            {
                // console.log('Admin checking for :'+ssoemail);
                $.ajax({
                    url: checkurl,
                    method: 'GET',
                    async: true,
                    headers: {
                        email: ssoemail
                    },
                    success: function (data) {
                        isAdmin = data.is_admin;
                        newUserAdminCheck = true;
                        checkadminrights();
                    },
                    error: function (xhr) {
                        newUserAdminCheck = false;
                        checkadminrights();
                    }
                }); return true;
            } 
            else 
            {
                isAdmin = false;
                return false;
            }
        }

        // // CHECK FOR ADMIN RIGHTS
        checkadminrights = function () {
            // console.log('admin checked');
            if (isAdmin) {
                // console.log("Showing for admin");
                $(".admin").css("display", "inline-block");
                $(".fa-pencil-square-o").css("display", "inline-block");
                $(".fa-trash-o").css("display", "inline-block");
                $(".fa-share-square-o").css("display", "inline-block");
            } else {
                // console.log("Hiding for user");
                $(".admin").css("display", "none");
                $(".fa-pencil-square-o").css("display", "none");
                $(".fa-trash-o").css("display", "none");
                $(".fa-share-square-o").css("display", "none");
                // var appBanners = document.getElementsByClassName('admin'), i;
                // for (var i = 0; i < appBanners.length; i++) {
                //     appBanners[i].style.visibility = 'none';
                // }
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

        self.currentNavArrowPlacement = ko.observable("adjacent");
        self.currentNavArrowVisibility = ko.observable("auto");
        
        getItemInitialDisplay1 = function (index) {
            return index < 2 ? '' : 'none';
        };

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
        self.orgdottedline = ko.observable('');
        self.orgwebsite = ko.observable('');
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
        self.kwid = ko.observable('');
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
        self.empfeatid = ko.observable('');
        self.empfeatbg = ko.observableArray([]);
        self.empfeatheading = ko.observable('');
        self.empfeattext = ko.observable('');
        self.empfeatlist = ko.observableArray([]);
        self.empdeatils=ko.observable('');
        self.empdeatilsmatched = ko.observableArray([]);

        self.openVideo = function() { 
            $("#modalDialog1").ojDialog("open");
        };
        empf1 = function(id) 
        {
            console.log(id);
            self.empdeatils(id);
            self.empdeatilsmatched([]);
            for (var b = 0; b < self.empfeatlist().length; b++) 
            {
                if (self.empfeatlist()[b].empfeaid == id)
                {
                    self.empdeatilsmatched.push({ 
                        dempfeaid: self.empfeatlist()[b].empfeaid, 
                        dempfeatext: self.empfeatlist()[b].empfeatext, 
                        dempfeaheading: self.empfeatlist()[b].empfeaheading, 
                        dempfeabg: self.empfeatlist()[b].empfeabg,
                        dempfeaarchived: self.empfeatlist()[b].archived 
                    });
                    analytics(self.empfeatlist()[b].empfeaheading, '', 'View_details', 'Homepage', 'Employee Features', '');
                }
            }
            $("#empf1").ojDialog("open");
        };
        self.empf2 = function() { 
            $("#empf2").ojDialog("open");
        };
        self.empf3 = function() { 
            $("#empf3").ojDialog("open");
        };

        /******************************************SLIDER********************************************************************/

        var editor_instance_slider;
        var editor_instance_slider_data;//this variable stores data in modal ..it gets updated on desc modal close
        var editor_instance_title_slider;
        var editor_instance_title_slider_data;//this variable stores data in modal ..it gets updated on desc modal close
        
        idimage = function (event) 
        {
            self.slimgid(event);
        }
        self.addslider = function () 
        {
            var selectedimageid = '';

            // if (self.sltitle().length == 0) {
            //     alert("Please enter Banner Title");
            //     return;
            // }

            selectedimageid = ko.toJSON(self.slimgid());

            // var sl = {
            //     id: self.slid(),
            //     title: editor_instance_title_slider_data,
            //     description: editor_instance_slider_data,
            //     button_label1: self.slbuttonlabel1(),
            //     button_label2: self.slbuttonlabel2(),
            //     link_text1:self.sllinktext1(),
            //     link_text2: self.sllinktext2(),
            //     image_id: self.slimgid()
            // }

            var sl = {
                id: self.slid(),
                title: self.sltitle(),
                description: self.sldescription(),
                button_label1: self.slbuttonlabel1(),
                button_label2: self.slbuttonlabel2(),
                link_text1: self.sllinktext1(),
                link_text2: self.sllinktext2(),
                image_id: self.slimgid()
            }

            $.ajax({
                url: homebaseurl+'home_screen_data',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(sl),
                success: function (sldata) {
                    fetchslider();
                    closeaddslidedialog();
                    resetslider();
                    self.checkadminrightsnew();
                }
            }).fail(function (xhr, textStatus, err) {
                alert(err);
                self.checkadminrightsnew();
            });
        }

        var editor_instance_edit_slider;
        var editor_instance_edit_slider_data;//this variable stores data in modal ..it gets updated on desc modal close
        var editor_instance_edit_title_slider;
        var editor_instance_edit_title_slider_data;//this variable stores data in modal ..it gets updated on desc modal close
        
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
            // editor_instance_edit_title_slider_data = edit_slider.slidertitle;
            // editor_instance_edit_slider_data = edit_slider.sliderdesc;
            self.editslbuttonlabel1(edit_slider.sliderbl1);
            self.editslbuttonlabel2(edit_slider.sliderbl2);
            self.editsllinktext1(edit_slider.sliderlt1);
            self.editsllinktext2(edit_slider.sliderlt2);
            $("#editslidedialog").ojDialog("open");
            $.getJSON(homebaseurl+"homepage_image_get_all").
                then(function (imgid) {
                self.slimage([]);
                for (var l = 0; l < imgid.items.length; l++) 
                {
                    self.slimage.push({
                        idimg: imgid.items[l].id,
                        source: imgid.items[l].images
                    })
                }
                self.checkadminrightsnew();
            });
        }

        editslidervalues = function () {
            var editor_title_data = editor_instance_edit_title_slider_data;
            var editor_desc_data = editor_instance_edit_slider_data;
            var edit_slider_data = {
                id: self.editslid(),
                title: self.editsltitle(),
                description: self.editsldescription(),
                // title: editor_title_data,
                // description: editor_desc_data,
                button_label1: self.editslbuttonlabel1(),
                button_label2:self.editslbuttonlabel2(),
                link_text1: self.editsllinktext1(),
                link_text2: self.editsllinktext2(),
                image_id: self.editslimgid()
            }
            console.log("editing slider data : "+ko.toJSON(edit_slider_data));
            $.ajax({
                url: homebaseurl+'home_screen_data',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(edit_slider_data),
                success: function (data) {
                    fetchslider();
                    closeaddslidedialog();
                    $("#editslidedialog").ojDialog("close");
                    resetslider();
                    self.checkadminrightsnew();
                },
                fail: function (xhr, textStatus, err) {
                    console.log("failed"+err);
                    self.checkadminrightsnew();
                },
                error: function (xhr, textStatus, err) {
                    console.log("error"+err);
                    self.checkadminrightsnew();
                }
            });
        }

        archiveslider = function (slider_archive) 
        {
            console.log("Archived Slider", slider_archive.sliderid);
            var data_sl_value = {
                "id": slider_archive.sliderid,
                "archived": "YES"
            };
            $.ajax({
                url: homebaseurl + 'home_screen_data',
                method: 'DELETE',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(data_sl_value),
                success: function () {
                    console.log("Slider Archived");
                    fetchslider();
                    self.checkadminrightsnew();
                },
                fail: function (xhr, textStatus, err) {
                    console.log("Fail: ",err);
                    self.checkadminrightsnew();
                },
                error: function (xhr, textStatus, err) {
                    console.log("Error: ",err);
                    self.checkadminrightsnew();
                }
            });
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
                    url: homebaseurl+'home_screen_data',
                    method: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(data_sl_value),
                    success: function () {
                        closeDeleteSliderModal();
                        console.log("delete success for slider");
                        fetchslider();
                        self.checkadminrightsnew();
                    },
                    fail: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    },
                    error: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    }
                });
            });

        }

        closeDeleteSliderModal = function () {
            $("#delete_slider").ojDialog("close");
        }

        fetchslider = function () 
        {
            $.getJSON(homebaseurl+'home_screen_data').then(function (fetchslider) 
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
                        slidertitle: sllist[s].title,
                        sliderarchived: sllist[s].archived
                    })
                }
                self.checkadminrightsnew();
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

        /*var intermediate_data_sl_title;
        openslidertitlemodal = function () 
        {
            editor_instance_title_slider = CKEDITOR.instances.sltextarea1;
            if (editor_instance_title_slider) {
                intermediate_data_sl_title = editor_instance_title_slider_data;
                editor_instance_title_slider.destroy(true);
            }

            CKEDITOR.replace('sltextarea1', {
                uiColor: '#D3D3D3',
                height: 500,
                removePlugins: 'maximize',
                enterMode: CKEDITOR.ENTER_BR,
                on:
                {
                    instanceReady: function () {
                        this.editable().setStyle('background-color', '#95A8AE');
                    }
                }
            });

            $("#modaltitleslider").on("ojbeforeclose", function (event, ui) 
            {
                editor_instance_title_slider_data = CKEDITOR.instances.sltextarea1.getData();
            });

            CKEDITOR.instances.sltextarea1.setData(intermediate_data_sl_title);
            $("#modaltitleslider").ojDialog("open");
        }

        var intermediate_data_sl_desc
        opensliderdescriptionmodal = function () 
        {
            editor_instance_slider = CKEDITOR.instances.sltextarea2;
            if (editor_instance_slider) 
            {
                intermediate_data_sl_desc = editor_instance_slider_data;
                editor_instance_slider.destroy(true);
            }

            CKEDITOR.replace('sltextarea2', {
                uiColor: '#D3D3D3',
                height: 500,
                removePlugins: 'maximize',
                enterMode: CKEDITOR.ENTER_BR,
                on: 
                {
                    instanceReady: function () 
                    {
                        this.editable().setStyle('background-color', '#95A8AE');
                    }
                }
            });

            $("#modaldescslider").on("ojbeforeclose", function (event, ui) 
            {
                editor_instance_slider_data = CKEDITOR.instances.sltextarea2.getData();
            });

            CKEDITOR.instances.sltextarea2.setData(intermediate_data_sl_desc);
            $("#modaldescslider").ojDialog("open");
        }

        var intermediate_data_sl_edit_title;
        openeditslidertitlemodal = function () 
        {
            editor_instance_edit_title_slider = CKEDITOR.instances.sledittextarea1;
            if (editor_instance_edit_title_slider) {
                intermediate_data_sl_edit_title = editor_instance_edit_title_slider_data;
                editor_instance_edit_title_slider.destroy(true);
            }

            CKEDITOR.replace('sledittextarea1', {
                uiColor: '#D3D3D3',
                height: 500,
                removePlugins: 'maximize',
                enterMode: CKEDITOR.ENTER_BR,
                on:
                {
                    instanceReady: function () {
                        this.editable().setStyle('background-color', '#95A8AE');
                    }
                }
            });

            $("#modaledittitleslider").on("ojbeforeclose", function (event, ui) {
                editor_instance_edit_title_slider_data = CKEDITOR.instances.sledittextarea1.getData();
            });

            CKEDITOR.instances.sledittextarea1.setData(intermediate_data_sl_edit_title);
            $("#modaledittitleslider").ojDialog("open");
        }

        var intermediate_data_sl_edit_desc;
        openeditsliderdescriptionmodal = function () 
        {
            editor_instance_edit_slider = CKEDITOR.instances.sledittextarea2;
            if (editor_instance_edit_slider) {
                intermediate_data_sl_edit_desc = editor_instance_edit_slider_data;
                editor_instance_edit_slider.destroy(true);
            }

            CKEDITOR.replace('sledittextarea2', {
                uiColor: '#D3D3D3',
                height: 500,
                removePlugins: 'maximize',
                enterMode: CKEDITOR.ENTER_BR,
                on:
                {
                    instanceReady: function () {
                        this.editable().setStyle('background-color', '#95A8AE');
                    }
                }
            });

            $("#modaleditdescslider").on("ojbeforeclose", function (event, ui) {
                editor_instance_edit_slider_data = CKEDITOR.instances.sledittextarea2.getData();
            });

            CKEDITOR.instances.sledittextarea2.setData(intermediate_data_sl_edit_desc);
            $("#modaleditdescslider").ojDialog("open");
        }*/

        /******************************************SLIDER ENDS********************************************************************/

        
        /******************************************OUR ORGANIZATION***************************************************************/

        $.getJSON(homebaseurl+'GETORGLOV').then(function (orgtypes) 
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
            self.checkadminrightsnew();
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
                "website": self.orgwebsite(),
                "mimetype": employeephotopath.type
                }

              var imagedata = reader.result.split('base64,')[1];// console.log(uploadheader,reader.result);
              // SEND TO SERVER
              $.ajax({
                url: homebaseurl+'employee_data/',
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
                  self.checkadminrightsnew();
                }
              }).fail(function (xhr, textStatus, err) {
                alert(err);
                self.checkadminrightsnew();
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
        self.editorgwebsite = ko.observable('');

        var edemployeephotopath = "";
        editimageselected = function (event)
        {
            edemployeephotopath = event.target.files[0];
            console.log("filename for photo of edit org",edemployeephotopath);
            // console.log("edit key wins filename length ", edemployeephotopath.length);
            // $("#input-2").replaceWith($("#input-2").val('').clone(true));
        }
        openEditOrgModal = function (edit_org) {
            $("#editorgdialog").ojDialog("open");
            console.log(edit_org);
            self.editorganizationid('');
            self.editorganizationselected('');
            self.editorgpeoplename('');
            self.editorgpeopledesignation('');
            self.editorgdottedline('');
            self.editorgimage('');
            self.editorgwebsite('');

            // SET NEW VALUE
            self.editorganizationid(edit_org.orgempid);
            self.editorganizationselected(edit_org.orglob);
            self.editorgpeoplename(edit_org.orgname);
            self.editorgpeopledesignation(edit_org.orgdesig);
            self.editorgdottedline(edit_org.orgdotline);
            self.editorgimage(edit_org.orgimage);
            self.editorgwebsite(edit_org.orgweb);
        }
        editorgdialog = function (edit_org, param2) 
        {
            // self.editorganizationselected(self.editorgsel()[0]);
            var edit_org_data = 
            {
                orgempid: self.editorganizationid(),
                orglob: self.editorganizationselected(),
                orgname: self.editorgpeoplename(),
                orgdesig: self.editorgpeopledesignation(),
                orgdotline: self.editorgdottedline(),
                orgimage: self.editorgimage(),
                orgweb: self.editorgwebsite()
            }

            console.log("edit organization data: "+ko.toJSON(edit_org_data));
            if (edemployeephotopath.length == 0)
            {
                var uploadorgedheader = 
                {
                    "empid": self.editorganizationid(),
                    "organization": self.editorganizationselected(),
                    "name": self.editorgpeoplename(),
                    "designation": self.editorgpeopledesignation(),
                    "dot_line": self.editorgdottedline()!=true?'No':'Yes',
                    "website": self.editorgwebsite()
                }

                // SEND TO SERVER
                $.ajax({
                    url: homebaseurl + 'employee_data/',
                    headers: uploadorgedheader,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                    },
                    success: function (dataorg) 
                    {
                        console.log("Organization people edited successfully!");
                        resetorg();
                        fetchpeopleorg();
                        closeEditOrgModal();
                        self.checkadminrightsnew();
                    }
                }).fail(function (xhr, textStatus, err) {
                    alert("error in editing data",err);
                    self.checkadminrightsnew();
                });
            } 
            else
            {
                var orgedreader = new FileReader();
                orgedreader.onload = function () 
                {
                    var uploadorgedheader = 
                    {
                        "empid": self.editorganizationid(),
                        "organization": self.editorganizationselected(),
                        "name": self.editorgpeoplename(),
                        "designation": self.editorgpeopledesignation(),
                        "dot_line": self.editorgdottedline()!=true?'No':'Yes',
                        "website": self.editorgwebsite(),
                        "mimetype": edemployeephotopath.type
                    }

                    var imageorgeddata = orgedreader.result.split('base64,')[1];
                    // SEND TO SERVER
                    $.ajax({
                        url: homebaseurl+'employee_data/',
                        headers: uploadorgedheader,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: imageorgeddata,
                        beforeSend: function (xhr) {
                            xhr.withCredentials = true;
                        },
                        success: function (dataorg) 
                        {
                            console.log("Organization people edited successfully!");
                            resetorg();
                            fetchpeopleorg();
                            closeEditOrgModal();
                            self.checkadminrightsnew();
                        }
                    }).fail(function (xhr, textStatus, err) {
                        alert("error in editing image data",err);
                        self.checkadminrightsnew();
                    });
                };
                orgedreader.readAsDataURL(edemployeephotopath);
            }
        }

        closeEditOrgModal = function () {
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
                    url: homebaseurl+'employee_data/',
                    method: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(data_org_value),
                    success: function () {
                        closeDeleteOrganizationModal();
                        console.log("delete success for organization");
                        fetchpeopleorg();
                        resetorg();
                        self.checkadminrightsnew();
                    },
                    fail: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    },
                    error: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    }
                });
            });

        }

        closeDeleteOrganizationModal = function () {
            $("#delete_organization").ojDialog("close");
        }

        fetchpeopleorg = function () 
        {
            $.getJSON(homebaseurl+'employee_data').then(function (orgpeopledetails) 
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
                                orgdotline: orgplist[b].dot_line,
                                orgweb: orgplist[b].website
                            })
                            break;
                        case "Platform Specialist":
                            self.organizationpeoplepslist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line,
                                orgweb: orgplist[b].website
                            })
                            break;
                        case "Oracle Digital":
                            self.organizationpeopleodlist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line,
                                orgweb: orgplist[b].website
                            })
                            break;
                        case "SE Excellence":
                            self.organizationpeopleseelist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line,
                                orgweb: orgplist[b].website
                            })
                            break;
                        case "Industry Advisors":
                            self.organizationpeopleialist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line,
                                orgweb: orgplist[b].website
                            })
                            break;
                        case "Cloud Solution Hubs":
                            self.organizationpeoplecshlist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line,
                                orgweb: orgplist[b].website
                            })
                            break;
                        case "Cloud Customer Success":
                            self.organizationpeopleccslist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line,
                                orgweb: orgplist[b].website
                            })
                            break;
                        case "Hardware":
                            self.organizationpeoplehdwlist.push({
                                orgdesig: orgplist[b].designation,
                                orgempid: orgplist[b].empid,
                                orgimage: orgplist[b].image,
                                orgname: orgplist[b].name,
                                orglob: orgplist[b].organization,
                                orgdotline: orgplist[b].dot_line,
                                orgweb: orgplist[b].website
                            })
                            break;
                    }
                }
                self.checkadminrightsnew();
            });
        }
        fetchpeopleorg();

        resetorg = function (){
            self.organizationselected('');
            self.orgpeoplename('');
            self.orgpeopledesignation('');
            self.orgdottedline('');
            self.orgwebsite('');
            self.editorganizationselected('');
            self.editorgpeoplename('');
            self.editorgpeopledesignation('');
            self.editorgdottedline('');
            self.editorgwebsite('');
            // document.getElementById("input-2").value = "";
            // document.getElementById("edinput-2").value = ""; 
        }
        /******************************************OUR ORGANIZATION ENDS*****************************************************/
        
        /******************************************KEY DATES*****************************************************/
        fetchkeydates = function () 
        {
            $.getJSON(homebaseurl+'KeyDates').then(function (keydatesdetails) 
            {
                // Fetch key dates details
                var homelink;
                homelink = window.location.href;
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
                        keydtype: kdlist[b].training_type,
                        keydname: kdlist[b].name,
                        keydhlink: homelink,
                        keydhevlink: kdlist[b].link,
                        keydstartdate: stdate.toDateString(),
                        keydstarttime: kdlist[b].start_date != undefined ? kdlist[b].start_date.substring(11, 19) + " PT" : '',
                        keydenddate: endate.toDateString(),
                        keydendtime: kdlist[b].end_date != undefined ? kdlist[b].end_date.substring(11, 19) + " PT" : ''
                    })
                }
                self.checkadminrightsnew();
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
              // SEND TO SERVER
              $.ajax({
                url: homebaseurl+'KeyWins',
                headers: uploadakwheader,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: akwimagedata,
                success: function (dataakw) {
                  console.log("Key Wins added successfully!");
                  fetchkeywins();
                  resetkeywins();
                  closeaddnewkeywinsdialog();
                  self.checkadminrightsnew();
                }
              }).fail(function (xhr, textStatus, err) {
                alert(err);
                self.checkadminrightsnew();
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
            console.log("edit key wins filename length ", ekwlogopath.size);
            // $("#kwlogoeditupl").replaceWith($("#kwlogoeditupl").val('').clone(true));
        }

        editkeywins = function (edit_kw) 
        {
            var edit_keywins_data = {
                id: self.editkwid(),
                image: self.editkwlogo(),
                link: self.editkwlink(),
                text: self.editkwtext()
            }

            console.log("edit key wins data: " + ko.toJSON(edit_keywins_data));
            if (ekwlogopath.length == 0) 
            {
                var uploadekwheader = 
                {
                    "id": self.editkwid(),
                    "text": self.editkwtext(),
                    "link": self.editkwlink()
                }

                // SEND TO SERVER
                $.ajax({
                    url: homebaseurl + 'KeyWins',
                    headers: uploadekwheader,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    success: function (dataakw) {
                        console.log("Keywin edited successfully");
                        fetchkeywins();
                        resetkeywins();
                        closeEditKeyWinsModal();
                        self.checkadminrightsnew();
                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log(err);
                    self.checkadminrightsnew();
                });
            }
            else 
            {
                var ekwreader = new FileReader();
                ekwreader.onload = function () 
                {
                    var uploadekwheader = 
                    {
                        "id": self.editkwid(),
                        "text": self.editkwtext(),
                        "link": self.editkwlink(),
                        "mimetype": ekwlogopath.type
                    }

                    var ekwimagedata = ekwreader.result.split('base64,')[1];
                    // SEND TO SERVER
                    $.ajax({
                        url: homebaseurl + 'KeyWins',
                        headers: uploadekwheader,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: ekwimagedata,
                        success: function (dataakw) {
                            console.log("edit success for keywins");
                            fetchkeywins();
                            closeEditKeyWinsModal();
                            resetkeywins();
                            self.checkadminrightsnew();
                        }
                    }).fail(function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    });
                };
                ekwreader.readAsDataURL(ekwlogopath);
            }            
        }

        openEditKeyWinsModal = function (editkeywins) 
        {
            $("#editkeywinsdialog").ojDialog("open");
            console.log("Edit key wins data", editkeywins);
            self.editkwid('');
            self.editkwlogo('');
            self.editkwlink('');
            self.editkwtext('');

            // SET NEW VALUE
            self.editkwid(editkeywins.keywid);
            self.editkwlogo(editkeywins.keywphoto);
            self.editkwlink(editkeywins.keywlink);
            self.editkwtext(editkeywins.keywtext);            
        }

        closeEditKeyWinsModal = function () {
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
                    url: homebaseurl+'KeyWins',
                    method: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(data_kw_value),
                    success: function () {
                        fetchkeywins();
                        closeDeleteSKeyWinsModal();
                        console.log("delete success for key wins");
                        self.checkadminrightsnew();
                    },
                    fail: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    },
                    error: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    }
                });
            });

        }

        closeDeleteSKeyWinsModal = function () {
            $("#delete_keywins").ojDialog("close");
        }

        fetchkeywins = function () 
        {
            $.getJSON(homebaseurl+'KeyWins').then(function (keywinsdetails) 
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
                self.checkadminrightsnew();
            });
        }
        fetchkeywins();

        resetkeywins = function (){
            self.kwlink('');
            self.kwtext('');
            self.editkwlink('');
            self.editkwtext('');
            document.getElementById("kwlogoupl").value = "";
            document.getElementById("kwlogoeditupl").value = "";
        }
        /******************************************KEY WINS ENDS********************************************************************/

        /******************************************GO LIVES*************************************************************************/

        var gllogopath = "";
        var glphotopath = "";

        gllogoselected = function (event) {
            gllogopath = event.target.files[0];
            console.log("add go lives logo filename", gllogopath);
        }
        glphotoselected = function (event) {
            glphotopath = event.target.files[0];
            console.log("add go lives photo filename", glphotopath);
        }
        uploadlogogl = function (lheader, ldata) 
        {
            console.log(lheader);
            $.ajax({
                url: homedevurl + 'PutImagesGoLive',
                headers: lheader,
                type: 'PUT',
                data: ldata,
                success: function (datalogogl) {
                    console.log("Go Lives logo added successfully!");
                    self.checkadminrightsnew();
                }
            }).fail(function (xhr, textStatus, err) {
                console.log("error in sending data to service in upload logo : ", err);
                self.checkadminrightsnew();
            });
        }
        uploadphotogl = function (pheader, pdata) 
        {
            console.log(pheader);
            $.ajax({
                url: homedevurl + 'PutImagesGoLive',
                headers: pheader,
                type: 'PUT',
                data: pdata,
                success: function (dataphotogl) {
                    console.log("Go Lives presenter photo added successfully!");
                    self.checkadminrightsnew();
                }
            }).fail(function (xhr, textStatus, err) {
                console.log("error in sending data to service in upload photo: ", err);
                self.checkadminrightsnew();
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

            var glheader = 
            {
                hosted_by: self.glhostedby(),
                episode_guest: self.glguest(),
                link: self.gllink(),
                go_live_description: self.gldiscussion()
            }
            console.log(ko.toJSON(glheader));

            $.ajax({
                url: homedevurl + 'GoLives',
                headers: glheader,
                type: 'POST',
                success: function (gldata) 
                {
                    console.log("go lives data uploaded");//console.log("id is:",gldata.return_id);
                    //Logo Upload
                    var glreader = new FileReader();
                    glreader.onload = function () 
                    {
                        var uploadglheader = {
                            "id": gldata.return_id,
                            "logo_or_bg": "logo",
                            "mimetype": gllogopath.type
                        }

                        var gllogodata = glreader.result.split('base64,')[1];

                        // SEND TO SERVER
                        uploadlogogl(uploadglheader, gllogodata);
                    };
                    glreader.readAsDataURL(gllogopath);

                    //Photo Upload
                    var glpreader = new FileReader();
                    glpreader.onload = function () 
                    {
                        var uploadglpheader = {
                            "id": gldata.return_id,
                            "logo_or_bg": "background",
                            "mimetype": glphotopath.type
                        }

                        var glphotodata = glpreader.result.split('base64,')[1];

                        // SEND TO SERVER

                        uploadphotogl(uploadglpheader, glphotodata);
                    };
                    glpreader.readAsDataURL(glphotopath);
                    fetchgolives();
                    $("#editgltextdialog").ojDialog("close");
                    resetgolives();
                    self.checkadminrightsnew();
                }
            }).fail(function (xhr, textStatus, err) {
                console.log("error in sending data to service in add : ",err);
                self.checkadminrightsnew();
            });
        }

        var edgllogodata, edglphotodata;
        var edgllogopath = "";
        var edglphotopath = "";

        edgllogoselected = function (event) {
            edgllogopath = event.target.files[0];
            console.log("add go lives logo filename", edgllogopath);
        }
        edglphotoselected = function (event) {
            edglphotopath = event.target.files[0];
            console.log("add go lives photo filename", edglphotopath);
        }

        //GO LIVES observables
        self.editglid = ko.observable('');
        self.editgllogo = ko.observable('');
        self.editglhostedby = ko.observable('');
        self.editglguest = ko.observable('');
        self.editgllink = ko.observable('');
        self.editglhostphoto = ko.observable('');
        self.editgldiscussion = ko.observable('');

        openEditGoLiveslmodal = function (edit_gl) 
        {
            openeditgltextdialog();// console.log(edit_gl);

            self.editglid('');
            self.editgllogo('');
            self.editglhostedby('');
            self.editglguest('');
            self.editgllink('');
            self.editglhostphoto('');
            self.editgldiscussion('');

            // SET NEW VALUE
            self.editglid(edit_gl.golid);
            self.editgllogo(edit_gl.gollogo);
            self.editglhostedby(edit_gl.golhostedby);
            self.editglguest(edit_gl.golguest);
            self.editgllink(edit_gl.gollink);
            self.editglhostphoto(edit_gl.golbackground);
            self.editgldiscussion(edit_gl.goldescription);
        }

        editgolives = function () 
        {
            var edglheader =
            {
                id: self.editglid(),
                hosted_by: self.editglhostedby(),
                episode_guest: self.editglguest(),
                link: self.editgllink(),
                go_live_description: self.editgldiscussion()
            }

            console.log(edglheader);
            $.ajax({
                url: homedevurl + 'GoLives',
                headers: edglheader,
                type: 'POST',
                success: function (edgldata) 
                {
                    if (edgllogopath.length == 0 && edglphotopath.length != 0) 
                    {
                        //Logo Upload is not needed
                        console.log("logo null");

                        //Photo Upload
                        var edglpreader = new FileReader();
                        edglpreader.onload = function () {
                            var eduploadglpheader = {
                                "id": self.editglid(),
                                "logo_or_bg": "background",
                                "mimetype": edglphotopath.type
                            }
                            console.log(eduploadglpheader);

                            var edglphotodata = edglpreader.result.split('base64,')[1];

                            // SEND TO SERVER
                            uploadphotogl(eduploadglpheader, edglphotodata);
                        };
                        edglpreader.readAsDataURL(edglphotopath);
                        $("#editgltextdialog").ojDialog("close");
                        fetchgolives();
                        resetgolives();
                        // location.reload();
                    }
                    else if (edglphotopath.length == 0 && edgllogopath.length != 0)
                    {
                        console.log("photo null");
                        //Logo Upload
                        var edglreader = new FileReader();
                        edglreader.onload = function () {
                            var eduploadglheader = {
                                "id": self.editglid(),
                                "logo_or_bg": "logo",
                                "mimetype": edgllogopath.type
                            }
                            console.log(eduploadglheader);

                            var edgllogodata = edglreader.result.split('base64,')[1];

                            // SEND TO SERVER
                            uploadlogogl(eduploadglheader, edgllogodata);
                        };
                        edglreader.readAsDataURL(edgllogopath);

                        //Photo Upload is not needed

                        $("#editgltextdialog").ojDialog("close");
                        fetchgolives();
                        resetgolives();
                    }
                    else if (edglphotopath.length != 0 && edgllogopath.length != 0) 
                    {
                        console.log("logo and photo present");
                        //Logo Upload
                        var edglreader = new FileReader();
                        edglreader.onload = function () {
                            var eduploadglheader = {
                                "id": self.editglid(),
                                "logo_or_bg": "logo",
                                "mimetype": edgllogopath.type
                            }
                            console.log(eduploadglheader);

                            var edgllogodata = edglreader.result.split('base64,')[1];

                            // SEND TO SERVER
                            uploadlogogl(eduploadglheader, edgllogodata);
                        };
                        edglreader.readAsDataURL(edgllogopath);

                        //Photo Upload
                        var edglpreader = new FileReader();
                        edglpreader.onload = function () {
                            var eduploadglpheader = {
                                "id": self.editglid(),
                                "logo_or_bg": "background",
                                "mimetype": edglphotopath.type
                            }
                            console.log(eduploadglpheader);

                            var edglphotodata = edglpreader.result.split('base64,')[1];

                            // SEND TO SERVER
                            uploadphotogl(eduploadglpheader, edglphotodata);
                        };
                        edglpreader.readAsDataURL(edglphotopath);
                        $("#editgltextdialog").ojDialog("close");
                        fetchgolives();
                        resetgolives();
                    }
                    else
                    {
                        console.log("logo null photo null");
                        $("#editgltextdialog").ojDialog("close");
                        fetchgolives();
                        resetgolives();
                    }
                    self.checkadminrightsnew();
                }
            }).fail(function (xhr, textStatus, err) {
                console.log("error in sending data to service in edit : ",err);
                self.checkadminrightsnew();
            });
        }

        deletegolives = function (golives_delete) 
        {
            console.log("Deleted Go live",golives_delete);
            openDeleteGoLivesModal(golives_delete.golid);
        }

        openDeleteGoLivesModal = function (delete_golives_id) {
            console.log("deleting id go lives - "+delete_golives_id);
            var data_gl_value = {
                "id" : delete_golives_id
            };
            $("#delete_golives").ojDialog("open");
            $("#delete_gl").click(function()
            {
                $.ajax({
                    url: homebaseurl+'GoLives',
                    method: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(data_gl_value),
                    success: function () {
                        closeDeleteGoLivesModal();
                        console.log("delete success for go lives");
                        fetchgolives();
                        self.checkadminrightsnew();
                    },
                    fail: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    },
                    error: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    }
                });
            });

        }

        closeDeleteGoLivesModal = function () {
            $("#delete_golives").ojDialog("close");
        }

        fetchgolives = function () 
        {
            $.ajax({
                url: homebaseurl + 'GoLives',
                dataType: 'json',
                async: false,
                success: function (golivesdetails) 
                {
                    var gllist = golivesdetails.items;
                    for (var b = 0; b < gllist.length; b++) {
                        self.goliveslist.push({
                            golid: gllist[b].id,
                            golhostedby: gllist[b].hosted_by,
                            golguest: gllist[b].episode_guest,
                            gollink: gllist[b].link,
                            goldescription: gllist[b].go_live_description,
                            golbackground: gllist[b].background,
                            gollogo: gllist[b].logo,

                        });
                    }
                    self.checkadminrightsnew();
                }
            }).fail(function (xhr, textStatus, err) {
                console.log(err);
                self.checkadminrightsnew();
            });//console.log(ko.toJSON(self.goliveslist()));
        }
        fetchgolives();

        resetgolives = function (){
            self.glhostedby('');
            self.glguest('');
            self.gllink('');
            self.gldiscussion('');
            self.editglhostedby('');
            self.editglguest('');
            self.editgllink('');
            self.editgldiscussion('');
            // document.getElementById("gllogo").value = "";
            // document.getElementById("glphoto").value = "";
            // document.getElementById("edgllogo").value = "";
            // document.getElementById("edglphoto").value = "";
        }
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
                url: homebaseurl+'Reference',
                headers: uploadrefheader,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: arefimagedata,
                success: function (dataref) {
                    fetchreferences();
                    closeaddnewrefdialog();
                    resetreferences();
                    self.checkadminrightsnew();
                }
              }).fail(function (xhr, textStatus, err) {
                alert(err);
                self.checkadminrightsnew();
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
                    url: homebaseurl + 'Reference',
                    headers: uploadrefheaderpass,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: arefimagedatapaas,
                    success: function (datarefpaas) {
                        console.log("References added successfully!");
                        fetchreferences();
                        closeaddnewrefdialogpaas();
                        resetreferences();
                        self.checkadminrightsnew();
                    }
                }).fail(function (xhr, textStatus, err) {
                    alert(err);
                    self.checkadminrightsnew();
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
            console.log("edit refrences filename length ", edreflogopath.size);
            // $("#edreflog").replaceWith($("#edreflog").val('').clone(true));
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
                    url: homebaseurl + 'Reference',
                    headers: uploadrefedheader,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    success: function (dataedref) {
                        console.log("Refrences edited successfully!");
                        fetchreferences();
                        closeReferencesModal();
                        resetreferences();
                        self.checkadminrightsnew();
                    }
                }).fail(function (xhr, textStatus, err) {
                    alert(err);
                    self.checkadminrightsnew();
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
                        url: homebaseurl + 'Reference',
                        headers: uploadrefedheader,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: edarefimagedata,
                        success: function (dataedref) {
                            console.log("Refrences edited successfully!");
                            fetchreferences();
                            closeReferencesModal();
                            resetreferences();
                            self.checkadminrightsnew();
                        }
                    }).fail(function (xhr, textStatus, err) {
                        alert(err);
                        self.checkadminrightsnew();
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
            console.log("edit refrences filename length ", edpaasreflogopath.size);
            // $("#edreflogpass").replaceWith($("#edreflogpass").val('').clone(true));
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
                    url: homebaseurl + 'Reference',
                    headers: uploadrefedheader,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    success: function (dataedref) {
                        console.log("Refrences edited successfully!");
                        fetchreferences();
                        closeReferencesPaasModal();
                        resetreferences();
                        self.checkadminrightsnew();
                    }
                }).fail(function (xhr, textStatus, err) {
                    alert(err);
                    self.checkadminrightsnew();
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
                        url: homebaseurl + 'Reference',
                        headers: uploadrefedheader,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: edpaasarefimagedata,
                        success: function (dataedref) {
                            console.log("Refrences edited successfully!");
                            fetchreferences();
                            closeReferencesPaasModal();
                            resetreferences();
                            self.checkadminrightsnew();
                        }
                    }).fail(function (xhr, textStatus, err) {
                        alert(err);
                        self.checkadminrightsnew();
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
                    url: homebaseurl+'Reference',
                    method: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(data_ref_value),
                    success: function () {
                        console.log("delete success for references");
                        fetchreferences();
                        closeDeleteReferencesModal();
                        self.checkadminrightsnew();
                    },
                    fail: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    },
                    error: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    }
                });
            });

        }

        closeDeleteReferencesModal = function () {
            $("#delete_references").ojDialog("close");
        }

        fetchreferences = function () 
        {
            $.getJSON(homebaseurl+'Reference').then(function (referencesdetails) 
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
                self.checkadminrightsnew();
            });
        }
        fetchreferences();

        resetreferences = function (){
            self.reflink('');
            self.editreflink('');
            document.getElementById("reflog").value = "";
            document.getElementById("edreflog").value = "";
            document.getElementById("reflogpass").value = "";
            document.getElementById("edreflogpass").value = "";
        }

        /******************************************REFERENCES ENDS********************************************************************/

        /******************************************EMPLOYEE FEATURES*************************************************************************/

        // var editor_instance_empf;
        // var editor_instance_empf_data;//this variable stores data in modal ..it gets updated on desc modal close
        // var editor_instance_edit_empf;
        // var editor_instance_edit_empf_data;//this variable stores data in modal ..it gets updated on desc modal close
        // var empphotopath = "";

        // var intermediate_data_empf_desc;
        // openempfdescriptionmodal = function () 
        // {
        //     editor_instance_empf = CKEDITOR.instances.txt2;
        //     if (editor_instance_empf) 
        //     {
        //         intermediate_data_empf_desc = editor_instance_empf_data;
        //         editor_instance_empf.destroy(true);
        //     }
        //     CKEDITOR.replace('txt2', {
        //         uiColor: '#D3D3D3',
        //         height: 500,
        //         removePlugins: 'maximize'
        //     });

        //     $("#modaldescempf").on("ojbeforeclose", function (event, ui) {
        //         editor_instance_empf_data = CKEDITOR.instances.txt2.getData();
        //     });
        //     CKEDITOR.instances.txt2.setData(intermediate_data_empf_desc);
        //     $("#modaldescempf").ojDialog("open");
        // }

        // var intermediate_data_empf_edit_desc;
        // openeditempfdescriptionmodal = function () 
        // {
        //     editor_instance_edit_empf = CKEDITOR.instances.edtxt2;
        //     if (editor_instance_edit_empf) 
        //     {
        //         intermediate_data_empf_edit_desc = editor_instance_edit_empf_data;
        //         editor_instance_edit_empf.destroy(true);
        //     }
        //     CKEDITOR.replace('edtxt2', {
        //         uiColor: '#D3D3D3',
        //         height: 500,
        //         removePlugins: 'maximize'
        //     });

        //     $("#modaleditdescempf").on("ojbeforeclose", function (event, ui) {
        //         editor_instance_edit_empf_data = CKEDITOR.instances.edtxt2.getData();
        //     });
        //     CKEDITOR.instances.edtxt2.setData(intermediate_data_empf_edit_desc);
        //     $("#modaleditdescempf").ojDialog("open");
        // }

        // empphotoselected = function (event)
        // {
        //     empphotopath = event.target.files[0];
        //     console.log("add employee features background filename",empphotopath);
        // }
        // addempfeatures = function () 
        // {
        //     if (self.empfeatheading().length == 0) {
        //         alert("Please enter Employee Features Heading");
        //         return;
        //     }

        //     // if (self.empfeattext().length == 0) {
        //     //     alert("Please enter Employee Features Text");
        //     //     return;
        //     // }
        //     var editor_text_data = editor_instance_empf_data;
        //     var efreader = new FileReader();
        //     efreader.onload = function () {
        //         var empfimagedata = efreader.result.split('base64,')[1];
        //         var uploadefheader = {
        //             "id": self.empfeatid(),
        //             "features_heading": self.empfeatheading(),
        //             "key_wins_text": editor_text_data,
        //             "logo": 
        //             [{
        //                 "logo": empfimagedata,
        //                 "mime_type": empphotopath.type
        //             }]
        //         }

        //       // SEND TO SERVER
        //       $.ajax({
        //         url: homebaseurl +'employee_features_new',
        //         data: ko.toJSON(uploadefheader),
        //         cache: false,
        //         type: 'POST',
        //         contentType: 'application/json; charset=utf-8',
        //         success: function (dataempfeat) {
        //             console.log(dataempfeat);
        //             console.log("Employee Features added successfully!");
        //             fetchempfeatures();
        //             closeaddnewefdialog();
        //             resetempfeatures();
        //             self.checkadminrightsnew();
        //         }
        //       }).fail(function (xhr, textStatus, err) {
        //         console.log("Error in employee_features API ",err);
        //         self.checkadminrightsnew();
        //       });
        //     };
        //     efreader.readAsDataURL(empphotopath);
        // }

        // //EDIT EMPLOYEE FEATURES observables
        // self.editempfeatid = ko.observable('');
        // self.editempfeatbg = ko.observable('');
        // self.editempfeatheading = ko.observable('');
        // self.editempfeattext = ko.observable('');

        // var eeflogopath = "";

        // eeflogoselected = function (event) 
        // {
        //     eeflogopath = event.target.files[0];
        //     console.log("add key logo filename", eeflogopath);
        //     console.log("edit key wins filename length ", eeflogopath.size);
        //     // $("#edefbg").replaceWith($("#edefbg").val('').clone(true));
        // }

        // editemployeefeatures = function (edit_ef) {
        //     var edit_empfeat_data = {
        //         id: self.editempfeatid(),
        //         image: self.editempfeatbg(),
        //         heading: self.editempfeatheading(),
        //         text: self.editempfeattext()
        //     }
        //     var editor_edit_text_data = editor_instance_edit_empf_data;
        //     console.log("edit employee feature data: " + ko.toJSON(edit_empfeat_data));
        //     if (eeflogopath.length == 0) 
        //     {
        //         var uploadeefheader = {
        //             "id": self.editempfeatid(),
        //             "key_wins_text": editor_edit_text_data,
        //             "features_heading": self.editempfeatheading(),
        //         }

        //         // SEND TO SERVER
        //         $.ajax({
        //             url: homebaseurl + 'employee_features',
        //             headers: uploadeefheader,
        //             cache: false,
        //             type: 'POST',
        //             contentType: 'application/json; charset=utf-8',
        //             success: function (dataeef) {
        //                 console.log("edit success for employee features");
        //                 fetchempfeatures();
        //                 resetempfeatures();
        //                 closeEditEmployeeFeaturesModal();
        //                 self.checkadminrightsnew();
        //             }
        //         }).fail(function (xhr, textStatus, err) {
        //             alert(err);
        //             self.checkadminrightsnew();
        //         });
        //     }
        //     else 
        //     {
        //         var eefreader = new FileReader();
        //         eefreader.onload = function () {
        //             var uploadeefheader = {
        //                 "id": self.editempfeatid(),
        //                 "key_wins_text": editor_edit_text_data,
        //                 "features_heading": self.editempfeatheading(),
        //                 "mimetype": eeflogopath.type
        //             }

        //             var eefimagedata = eefreader.result.split('base64,')[1];
        //             // SEND TO SERVER
        //             $.ajax({
        //                 url: homebaseurl + 'employee_features',
        //                 headers: uploadeefheader,
        //                 cache: false,
        //                 type: 'POST',
        //                 contentType: 'application/json; charset=utf-8',
        //                 data: eefimagedata,
        //                 success: function (dataeef) {
        //                     console.log("edit success for employee features");
        //                     fetchempfeatures();
        //                     resetempfeatures();
        //                     closeEditEmployeeFeaturesModal();
        //                     self.checkadminrightsnew();
        //                 }
        //             }).fail(function (xhr, textStatus, err) {
        //                 alert(err);
        //                 self.checkadminrightsnew();
        //             });
        //         };
        //         eefreader.readAsDataURL(eeflogopath);
        //     }
        // }

        // openEditEmployeeFeaturesModal = function (editemployeefeatures) {
        //     $("#editempfdialog").ojDialog("open");
        //     console.log("Edit employee features data", editemployeefeatures);
        //     self.editempfeatid('');
        //     self.editempfeatbg('');
        //     self.editempfeatheading('');
        //     self.editempfeattext('');

        //     // SET NEW VALUE
        //     self.editempfeatid(editemployeefeatures.empfeaid);
        //     self.editempfeatbg(editemployeefeatures.empfeabg);
        //     self.editempfeatheading(editemployeefeatures.empfeaheading);
        //     self.editempfeattext(editemployeefeatures.empfeatext);
        //     editor_instance_edit_empf_data = editemployeefeatures.empfeatext;
        // }


        var empphotopath = "";
        empphotoselected = function (event) {
            empphotopath = event.target.files[0];
            console.log("add employee features background filename", empphotopath);
        }
        addempfeatures = function () {
            if (self.empfeatheading().length == 0) {
                alert("Please enter Employee Features Heading");
                return;
            }

            if (self.empfeattext().length == 0) {
                alert("Please enter Employee Features Text");
                return;
            }

            var efreader = new FileReader();
            efreader.onload = function () {
                var uploadefheader = {
                    "id": self.empfeatid(),
                    "features_heading": self.empfeatheading(),
                    "key_wins_text": self.empfeattext(),
                    "mimetype": empphotopath.type
                }

                var empfimagedata = efreader.result.split('base64,')[1];

                // SEND TO SERVER
                $.ajax({
                    url: homebaseurl + 'employee_features',
                    headers: uploadefheader,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: empfimagedata,
                    success: function (dataempfeat) {
                        console.log(dataempfeat);
                        console.log("Employee Features added successfully!");
                        fetchempfeatures();
                        closeaddnewefdialog();
                        resetempfeatures();
                        self.checkadminrightsnew();
                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log(err);
                    self.checkadminrightsnew();
                });
            };
            efreader.readAsDataURL(empphotopath);
        }

        //EDIT EMPLOYEE FEATURES observables
        self.editempfeatid = ko.observable('');
        self.editempfeatbg = ko.observable('');
        self.editempfeatheading = ko.observable('');
        self.editempfeattext = ko.observable('');

        var eeflogopath = "";

        eeflogoselected = function (event) {
            eeflogopath = event.target.files[0];
            console.log("add key logo filename", eeflogopath);
            console.log("edit key wins filename length ", eeflogopath.size);
            // $("#edefbg").replaceWith($("#edefbg").val('').clone(true));
        }

        editemployeefeatures = function (edit_ef) {

            var edit_empfeat_data = {
                id: self.editempfeatid(),
                image: self.editempfeatbg(),
                heading: self.editempfeatheading(),
                text: self.editempfeattext()
            }

            console.log("edit employee feature data: " + ko.toJSON(edit_empfeat_data));
            if (eeflogopath.length == 0) {
                var uploadeefheader = {
                    "id": self.editempfeatid(),
                    "key_wins_text": self.editempfeattext(),
                    "features_heading": self.editempfeatheading(),
                }

                // SEND TO SERVER
                $.ajax({
                    url: homebaseurl + 'employee_features',
                    headers: uploadeefheader,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    success: function (dataeef) {
                        console.log("edit success for employee features");
                        fetchempfeatures();
                        resetempfeatures();
                        closeEditEmployeeFeaturesModal();
                        self.checkadminrightsnew();
                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log(err);
                    self.checkadminrightsnew();
                });
            }
            else {
                var eefreader = new FileReader();
                eefreader.onload = function () {
                    var uploadeefheader = {
                        "id": self.editempfeatid(),
                        "key_wins_text": self.editempfeattext(),
                        "features_heading": self.editempfeatheading(),
                        "mimetype": eeflogopath.type
                    }

                    var eefimagedata = eefreader.result.split('base64,')[1];
                    // SEND TO SERVER
                    $.ajax({
                        url: homebaseurl + 'employee_features',
                        headers: uploadeefheader,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: eefimagedata,
                        success: function (dataeef) {
                            console.log("edit success for employee features");
                            // self.empfeatlist([]);
                            fetchempfeatures();
                            resetempfeatures();
                            closeEditEmployeeFeaturesModal();
                            self.checkadminrightsnew();
                        }
                    }).fail(function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    });
                };
                eefreader.readAsDataURL(eeflogopath);
            }
        }

        openEditEmployeeFeaturesModal = function (editemployeefeatures) {
            $("#editempfdialog").ojDialog("open");
            console.log("Edit employee features data", editemployeefeatures);
            self.editempfeatid('');
            self.editempfeatbg('');
            self.editempfeatheading('');
            self.editempfeattext('');

            // SET NEW VALUE
            self.editempfeatid(editemployeefeatures.empfeaid);
            self.editempfeatbg(editemployeefeatures.empfeabg);
            self.editempfeatheading(editemployeefeatures.empfeaheading);
            self.editempfeattext(editemployeefeatures.empfeatext);
        }

        closeEditEmployeeFeaturesModal = function () {
            $("#editempfdialog").ojDialog("close");
        }

        archiveemployeefeatures = function (employeefeatures_archive) {
            console.log("Archived Employee Features", employeefeatures_archive.empfeaid);
            var data_ef_value = {
                "id": employeefeatures_archive.empfeaid,
                "archived": "YES"
            };
            $.ajax({
                url: homebaseurl + 'employee_features',
                method: 'DELETE',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(data_ef_value),
                success: function () {
                    console.log("Archive success for employee features");
                    fetchempfeatures();
                    self.checkadminrightsnew();
                },
                fail: function (xhr, textStatus, err) {
                    console.log("Fail: ", err);
                    self.checkadminrightsnew();
                },
                error: function (xhr, textStatus, err) {
                    console.log("Error: ", err);
                    self.checkadminrightsnew();
                }
            });
        }

        deleteemployeefeatures = function (ef_delete) {
            console.log("delete employee feature", ef_delete);
            openDeleteEmployeeFeaturesModal(ef_delete.empfeaid);
        }

        openDeleteEmployeeFeaturesModal = function (delete_empf_id) {
            console.log("deleting id employee feature - " + delete_empf_id);
            var data_ef_value = {
                "id": delete_empf_id
            };
            $("#delete_empfeat").ojDialog("open");
            $("#delete_ef").click(function () {
                $.ajax({
                    url: homebaseurl + 'employee_features',
                    method: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(data_ef_value),
                    success: function () {
                        console.log("delete success for employee features");
                        closeDeleteEmployeeFeaturesModal();
                        fetchempfeatures();
                        self.checkadminrightsnew();
                    },
                    fail: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    },
                    error: function (xhr, textStatus, err) {
                        console.log(err);
                        self.checkadminrightsnew();
                    }
                });
            });

        }

        closeDeleteEmployeeFeaturesModal = function () {
            $("#delete_empfeat").ojDialog("close");
        }

        fetchempfeatures = function () 
        {
            $.getJSON(homebaseurl +'employee_features').then(function (employeefeaturesdetails) 
            {
                // Fetch Employee features
                self.empfeatlist([]);
                var eflist = employeefeaturesdetails.items;// console.log(eflist);
                for (var b = 0; b < eflist.length; b++) 
                {
                    self.empfeatlist.push({
                        empfeaid: eflist[b].id,
                        empfeaheading: eflist[b].features_heading,
                        empfeatext: eflist[b].key_wins_text,
                        empfeabg: eflist[b].image,
                        empfeaarchived: eflist[b].archived
                    })
                }
                self.getEmpIdFromUrl();
                self.checkadminrightsnew();
            });
            checkadminrights();
        }
        fetchempfeatures();

        resetempfeatures = function(){
            self.empfeatheading('');
            self.empfeattext('');
            self.editempfeatheading('');
            self.editempfeattext('');
            document.getElementById("efbg").value = "";
            document.getElementById("edefbg").value = "";
        }

        self.getEmpIdFromUrl = function () 
        {
            if (window.location.href.indexOf("employeefeature") != -1) 
            {
                var type = window.location.href.split('#employeefeature=');
                var hash = '';
                if (type.length > 1)
                {
                    hash = type[1];
                }
                empf1(hash);
            }
        }

        /******************************************EMPLOYEE FEATURES ENDS********************************************************************/
        

        /******************************************OUR SERVICES******************************************************************************/

        //EDIT OUR SERVICES observables
        self.editostext = ko.observable('');
        self.editostitle = ko.observable('');
        self.oslist = ko.observableArray([]);

        openeditosdescriptionmodal = function (editourservices) {
            self.editostext('');
            self.editostitle('');
            $.ajax({
                url: homebaseurl + 'SEAAS_OS_UPDATE',
                method: 'GET',
                headers: {
                    "name": editourservices
                },
                success: function (osdetails) {
                    self.oslist([]);
                    var ourslist = osdetails.items;
                    var descriptionstring = ourslist[0].description;
                    descriptionstring = descriptionstring.replace(/\\/g, "");
                    self.editostext(descriptionstring);
                    self.oslist.push({
                        name: ourslist[0].name,
                        description: descriptionstring
                    })
                    if (self.oslist()[0].name == editourservices) {
                        self.editostitle(editourservices);
                        self.editostext(self.oslist()[0].description);
                    }
                    self.checkadminrightsnew();
                }
            }).fail(function (xhr, textStatus, err) {
                console.log("Error in SEAAS_OS_UPDATE API ", err);
                self.checkadminrightsnew();
            });
            $("#editOSdialog").ojDialog("open");
        }

        closeeditosdescriptionmodal = function () {
            $("#editOSdialog").ojDialog("close");
        }

        editos = function () 
        {
            var descriptionstring = self.editostext();
            if (self.editostext() == "")
            {
                var uploadedos = {
                    "name": self.editostitle(),
                    "description": "",
                    "ins_or_upd": "upd"
                }
            }
            else
            {
                descriptionstring = descriptionstring.replace(/\"/g, "\\\"");
                descriptionstring = descriptionstring.replace(/\n/ig, '');
                var uploadedos = {
                    "name": self.editostitle(),
                    "description": descriptionstring,
                    "ins_or_upd": "upd"
                }
            }//console.log(uploadedos);
            $.ajax({
                url: homebaseurl + 'SEAAS_OS_UPDATE',
                type: 'POST',
                cache: false,
                data: ko.toJSON(uploadedos),
                contentType: 'application/json',
                success: function (dataedos) {
                    console.log("Our Services edited successfully!");
                    closeeditosdescriptionmodal();
                    self.checkadminrightsnew();
                }
            }).fail(function (xhr, textStatus, err) {
                console.log("Error in SEAAS_OS_UPDATE API ", err);
                self.checkadminrightsnew();
            });
        }

        fetchourservices = function (popupheader) 
        {
            $.ajax({
                url: homebaseurl + 'SEAAS_OS_UPDATE',
                method: 'GET',
                headers: {
                    "name": popupheader
                },
                success: function (osdetails) {
                    self.oslist([]);
                    var ourslist = osdetails.items;
                    var descriptionstring = ourslist[0].description;
                    descriptionstring = descriptionstring.replace(/\\/g, "");
                    self.editostext(descriptionstring);
                    self.oslist.push({
                        name: ourslist[0].name,
                        description: descriptionstring
                    })
                    console.log(ko.toJSON(self.oslist()));
                    console.log(self.oslist());
                    self.checkadminrightsnew();
                }
            }).fail(function (xhr, textStatus, err) {
                console.log("Error in SEAAS_OS_UPDATE API ", err);
                self.checkadminrightsnew();
            });
        }

        resetos = function () {
            document.getElementById("edostxt2").value = "";
        }


        /******************************************OUR SERVICES ENDS*************************************************************************/


        /******************************************ANALYTICS*********************************************************************************/

        analytics = function (itemtitle, itemname, itemtype, itemlevel1, itemlevel2, itemlevel3) 
        {
            var itemdesc;
            if(ssoemail == "")
            {
                ssoemail = "test@oracle.com";
            }
            if(itemtitle != "" && itemname != "")
            {
                itemdesc = itemtitle + " > " + itemname;
            }
            else if (itemtitle == "" && itemname != "") 
            {
                itemdesc = itemname;
            }
            else if (itemtitle != "" && itemname == "") 
            {
                itemdesc = itemtitle;
            }
            else
            {
                itemdesc = "";
            }
            if(itemlevel3 == "")
            {
                var analytics = {
                    "session_id": sessionid,
                    "email": ssoemail,
                    "event_description": itemdesc,
                    "event_type": itemtype,
                    "level_1": itemlevel1,
                    "level_2": itemlevel2
                };
            }
            else
            {
                var analytics = {
                    "session_id": sessionid,
                    "email": ssoemail,
                    "event_description": itemdesc,
                    "event_type": itemtype,
                    "level_1": itemlevel1,
                    "level_2": itemlevel2,
                    "level_3": itemlevel3
                };
            }
            console.log(analytics);
            // $.ajax({
            //     url: homebaseurl + 'POST_EVENT_DATA',
            //     type: 'POST',
            //     contentType: 'application/json; charset=utf-8',
            //     data: ko.toJSON(analytics),
            //     success: function (event) {
            //         console.log("Analytics of event sent.", event);
            //     }
            // }).fail(function (xhr, textStatus, err) {
            //     alert("Error in sending analytics", err);
            // });
            return true;
        }

        /******************************************ANALYTICS ENDS***************************************************************************/


        closedialog=function(){                
            $("#modalDialog1").ojDialog("close");
        }

        opendialog=function(){                
            $("#modalDialog1").ojDialog("open");
            fetchourservices('Deliver a Cloud Day');
            analytics('Awareness', 'Deliver a Cloud Day', 'View_details', 'Homepage', 'Our Services', 'Awareness');
        }

        closedialog2=function(){                
            $("#modalDialog2").ojDialog("close");
        }

        opendialog2=function(){                
            $("#modalDialog2").ojDialog("open");
            fetchourservices('Develop a Cloud Vision');
            analytics('Demand', 'Develop a Cloud Vision', 'View_details', 'Homepage', 'Our Services', 'Demand');
        }

        closedialog3=function(){                
            $("#modalDialog3").ojDialog("close");
        }

        opendialog3=function(){                
            $("#modalDialog3").ojDialog("open");
            fetchourservices('Design a cloud Solution');
            analytics('Opportunity', 'Design a Cloud Solution', 'View_details', 'Homepage', 'Our Services', 'Opportunity');
        }

        closedialog4=function(){                
            $("#modalDialog4").ojDialog("close");
        }

        opendialog4=function(){                
            $("#modalDialog4").ojDialog("open");
            fetchourservices('Adopt a Cloud Solution');
            analytics('Success', 'Adopt a Cloud Solution', 'View_details', 'Homepage', 'Our Services', 'Success');
        }
        closedialog5=function(){                
            $("#modalDialog4]5").ojDialog("close");
        }

        opendialog5=function(){                
            $("#modalDialog5").ojDialog("open");
            fetchourservices('Support a Marketing Event');
            analytics('Awareness', 'Support a Marketing Event', 'View_details', 'Homepage', 'Our Services', 'Awareness');
        }

        closedialog6=function(){
            $("#modalDialog6").ojDialog("close");
        }

        opendialog6=function(){                
            $("#modalDialog6").ojDialog("open");
            fetchourservices('Develop a Value Hypothesis');
            analytics('Demand', 'Develop a Value Hypothesis', 'View_details', 'Homepage', 'Our Services', 'Demand');
        }

        closedialog7=function(){                
            $("#modalDialog7").ojDialog("close");
        }

        opendialog7=function(){                
            $("#modalDialog7").ojDialog("open");
            fetchourservices('Build a POC');
            analytics('Opportunity', 'Build a POC', 'View_details', 'Homepage', 'Our Services', 'Opportunity');
        }

        closedialog8=function(){                
            $("#modalDialog8").ojDialog("close");
        }

        opendialog8=function(){                
            $("#modalDialog8").ojDialog("open");
            fetchourservices('Deliver a Support Onboarding');
            analytics('Success', 'Deliver a Support Onboarding', 'View_details', 'Homepage', 'Our Services', 'Success');
        }

        closedialog9=function(){                
            $("#modalDialog9").ojDialog("close");
        }

        opendialog9=function(){                
            $("#modalDialog9").ojDialog("open");
            fetchourservices('Build an Executive Briefing');
            analytics('Awareness', 'Build an Executive Briefing', 'View_details', 'Homepage', 'Our Services', 'Awareness');
        }

        closedialog10=function(){                
            $("#modalDialog10").ojDialog("close");
        }

        opendialog10=function(){                
            $("#modalDialog10").ojDialog("open");
            fetchourservices('Create a Packaged Proposal');
            analytics('Demand', 'Create a Packaged Proposal', 'View_details', 'Homepage', 'Our Services', 'Demand');
        }

        closedialog11=function(){                
            $("#modalDialog11").ojDialog("close");
        }

        opendialog11=function(){                
            $("#modalDialog11").ojDialog("open");
            fetchourservices('Build a Business Case');
            analytics('Opportunity', 'Build a Business Case', 'View_details', 'Homepage', 'Our Services', 'Opportunity');
        }

        closedialog12=function(){
            $("#modalDialog12").ojDialog("close");
        }

        opendialog12=function(){                
            $("#modalDialog12").ojDialog("open");
            fetchourservices('Deliver a Health Check');
            analytics('Success', 'Deliver a Health Check', 'View_details', 'Homepage', 'Our Services', 'Success');
        }
		
		    closedialog13=function(){                
            $("#modalDialog13").ojDialog("close");
        }

        opendialog13=function(){                
            $("#modalDialog13").ojDialog("open");
            fetchourservices('Customer Discovery');
            analytics('Account Planning', 'Customer Discovery', 'View_details', 'Homepage', 'Our Services', 'Account Planning');
        }
		
		    closedialog14=function(){                
            $("#modalDialog14").ojDialog("close");
        }

        opendialog14=function(){                
            $("#modalDialog14").ojDialog("open");
            fetchourservices('Platform Assessments');
            analytics('Account Planning', 'Platform Assessments', 'View_details', 'Homepage', 'Our Services', 'Account Planning');
        }

		    closedialog15=function(){                
            $("#modalDialog15").ojDialog("close");
        }

        opendialog15=function(){                
            $("#modalDialog15").ojDialog("open");
            fetchourservices('Hands-on Workshops');
            analytics('Opportunity Planning', 'Hands-on Workshops', 'View_details', 'Homepage', 'Our Services', 'Opportunity Planning');
        }
        
        closedialog16=function(){                
            $("#modalDialog16").ojDialog("close");
        }

        opendialog16=function(){                
            $("#modalDialog16").ojDialog("open");
            fetchourservices('Customer Demos');
            analytics('Opportunity Planning', 'Customer Demos', 'View_details', 'Homepage', 'Our Services', 'Opportunity Planning');
        }
        
        closedialog17=function(){                
            $("#modalDialog17").ojDialog("close");
        }

        opendialog17=function(){                
            $("#modalDialog17").ojDialog("open");
            fetchourservices('RFx Response Support');
            analytics('Sales to Success Planning', 'RFx Response Support', 'View_details', 'Homepage', 'Our Services', 'Sales to Success Planning');
        }
        
        closedialog18=function(){                
            $("#modalDialog18").ojDialog("close");
        }

        opendialog18=function(){                
            $("#modalDialog18").ojDialog("open");
            fetchourservices('Sizing, Quoting and Configuration Support');
            analytics('Sales to Success Planning', 'Sizing, Quoting & Config Support', 'View_details', 'Homepage', 'Our Services', 'Sales to Success Planning');
        }
        
        closedialog19=function(){                
            $("#modalDialog19").ojDialog("close");
        }

        opendialog19=function(){                
            $("#modalDialog19").ojDialog("open");
            fetchourservices('Project Management Support');
            analytics('Renewal Planning', 'Project Management Support', 'View_details', 'Homepage', 'Our Services', 'Renewal Planning');
        }
        
        closedialog20=function(){                
            $("#modalDialog20").ojDialog("close");
        }

        opendialog20=function(){                
            $("#modalDialog20").ojDialog("open");
            fetchourservices('Reusable Asset Harvesting');
            analytics('Renewal Planning', 'Reusable Asset Harvesting', 'View_details', 'Homepage', 'Our Services', 'Renewal Planning');
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
            function isIE(userAgent) 
            {
              userAgent = userAgent || navigator.userAgent;
              return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;
            }
            var mainBar = document.getElementById("mainBar");
            var mainBar_h = mainBar.offsetHeight;
            var secnav = document.getElementById("setupBar");
            var secnav_h = secnav.offsetHeight;

            update_pos = function()
            {
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
        
        $(document).ready(function() 
        { 
            $('#myCarousel').carousel({interval: 5000, cycle: true});
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
            $.getJSON(homebaseurl+"homepage_image_get_all").
                then(function (imgid) {
                self.slimage([]);
                for (var l = 0; l < imgid.items.length; l++) 
                {
                    self.slimage.push({
                        idimg: imgid.items[l].id,
                        source: imgid.items[l].images
                    })
                }
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
        
        openeditgltextdialog = function () {
            $("#editgltextdialog").ojDialog("open");
        }
        closeeditgltextdialog = function () {
            $("#editgltextdialog").ojDialog("close");
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
            // if (CKEDITOR.instances.txt2) {
            //     CKEDITOR.instances.txt2.destroy(true); 
            // }
            // editor_instance_empf = "";   
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
            self.checkadminrightsnew();     
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
