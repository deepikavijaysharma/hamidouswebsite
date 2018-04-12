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


            /*---------------------------------ADMIN----------------------------------*/
            // ADMIN VIEW
            self.switchadminview=ko.observable(false);
            // CREATE COURSE
            self.coursetitle = ko.observable('');
            self.courselink = ko.observable('');
            self.coursedesc = ko.observable('');
            self.disabledtab = ko.observable([5, 6]);

            self.selectedrole = ko.observable('');
            self.selectedcategory = ko.observable('');
            self.selectedsubcategory = ko.observable('');

            self.roles = ko.observableArray([]);
            self.categories = ko.observableArray([]);
            self.subcategories = ko.observableArray([]);

            // REFINE SEARCH TRAINING
            self.refinecategories = ko.observableArray();
            self.refineproducttype = ko.observableArray();
            self.refinetraininglevel = ko.observableArray();
            self.refinetrainingtype = ko.observableArray();
            self.refinecitis = ko.observableArray();
            self.refineroles = ko.observableArray();

            // REFINE SEARCH FOR COMMUNITY CALLS
            self.refinecommunitycallroles = ko.observableArray();
            self.refinecommunitycallmodes = ko.observableArray();
            self.refinepastcalls = ko.observableArray();

            // category count
            self.catcnt = ko.observableArray([]);
            self.rolebasedcategory = ko.observableArray([]);
            self.categorybasedsubcategory = ko.observableArray([]);
            self.isAdvanced = ko.observableArray([]);

            // complexity count
            self.comcnt = ko.observableArray([]);
            // CREATE CATEGORY
            self.role = ko.observable('');
            self.category = ko.observable('');
            self.subcategory = ko.observable('');

            // CREATE COMMUNITY CALL
            self.communityCallList = ko.observableArray([]);

            self.courselist = ko.observableArray([]);
            self.reporteelist = ko.observableArray([]);
            var sdatetime;
            var edatetime;

            // REPORTEE
            self.selectreportees = ko.observableArray([]);

            self.selectedcourseid = "";
            self.selectedclassid = "";

            // TOAST MESSAGE DIALOG
            self.title = ko.observable("");
            self.msg = ko.observable("");
            self.success = ko.observableArray([]);
            self.failed = ko.observableArray([]);
            self.msg1 = ko.observableArray([]);
            self.msg2 = ko.observableArray([]);

            // CREATE COURSE VARIABLES
            self.course_name = ko.observable('');
            self.course_description = ko.observable('');
            self.categoryForUi = ko.observableArray([]);


            //REQUEST TRAINING VARIABLES
            self.rtrsel= ko.observable('');
            self.rtrcategory = ko.observable('');
            self.rtrname = ko.observable('');
            self.rtrselected = ko.observable('');

            // CREATE COURSE MODEL
            self.selectedCategoriesForUi = ko.observableArray([]);
            self.selectedCategoriesForCourse = ko.observableArray([]);

            // CLASS SCHEDULES
            self.schedule = ko.observable();
            self.schedule({
                start_date: ko.observable(),
                end_date: ko.observable(),
                timezone: ko.observable()
            })

            self.csdate = ko.observable('');
            self.cedate = ko.observable('');
            self.ctimezone = ko.observable('');

            // CLASSES
            self.cclass = ko.observable();
            self.cclass({
                class_id: ko.observable(''),
                description: ko.observable(''),
                class_size: ko.observable(''),
                enrollment_end_date: ko.observable(''),
                enrollment_end_date_view: ko.observable(''),
                city: ko.observable(''),
                state: ko.observable(''),
                status: ko.observable(''),
                key_event: ko.observable(false),
                schedules: ko.observableArray([])
            });


            // COURSE
            self.createCourse = ko.observable();
            self.createCourse({
                course_id: ko.observable(''),
                name: ko.observable(''),
                description: ko.observable(''),
                contact_email: ko.observable(''),
                cloud_onpremise: ko.observable(''),
                training_level: ko.observable(''),
                training_type: ko.observable(''),
                status: ko.observable(''),
                categories: ko.observableArray([]),
                categories_all:ko.observableArray([]),
                classes: ko.observableArray([])
            });


            self.event_report_type=ko.observableArray([]);
            self.event_report_no_days=ko.observableArray([]);
            self.event_report_key_event=ko.observableArray([]);
            self.searcheventreportstext=ko.observable('');

            self.rolelist = ko.observableArray([]);

            var editor_instance;
            //below variable stores data in modal ..it gets updated on desc modal close
            var editor_instance_data;

            var intermediate_data;        
            var intermediate_data1 = "";
            var editor_instance_data1 = "";  
            var intermediate_data2 = "";
            var editor_instance_data2 = "";
            var intermediate_data3 = "";
            var editor_instance_data3 = "";          
            var intermediate_data4 = "";
            var editor_instance_data4 = "";
            self.event_report_list = ko.observableArray([]);

            self.keydateslist = ko.observableArray([]);
            self.refinesel = ko.observableArray('');
            self.rtrcatselected = ko.observable('');

            /******************************************for refreshing home page key dates*****************************************************/
            fetchkeydates = function () {
                $.getJSON(homebaseurl + 'KeyDates').then(function (keydatesdetails) {
                    // Fetch key dates details
                    var homelink;
                    homelink = window.location.href;
                    homelink += "?root=training#";
                    self.keydateslist([]);
                    var stdate, kstdate, endate, kendate;
                    var kdlist = keydatesdetails.items;
                    for (var b = 0; b < kdlist.length; b++) {
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
                });
            }

            /******************************************for refreshing home page key dates ENDS*****************************************************/

            // EVENT HANDLER FOR ROLE SELECTION
            rolesselected = function (event, ui) {
                populateCategory(ui.value);
            }

            //EVENT HANDLE FOR CATEGORY SELECTION
            // categorySelected = function (event, ui) {
            //     populateSubcategory(ui.value);
            // }

            // POPULLATE CATEGORY BASED ON ROLE
            populateCategory = function (role) {
                self.selectedcategory('');
                self.rolebasedcategory([]);
                self.categorybasedsubcategory([]);
                for (var i = 0; i < self.categories().length; i++) {
                    var category = self.categories()[i];
                    if (category.parent == role) {
                        self.rolebasedcategory().push(category);
                    }
                }
            }

            // POPULATE SUBCATEGORY BASED ON CATEGORY
            populateSubcategory = function (role) {
                self.categorybasedsubcategory([]);
                for (var i = 0; i < self.subcategories().length; i++) {
                    var subcategory = self.subcategories()[i];
                    if (subcategory.parent == role) {
                        self.categorybasedsubcategory().push(subcategory);
                    }
                }
            }

            getRoleData = function () {
                $.getJSON(trainingbaseurl + "getFiltersV2").
                then(function (reasons) {

                    // Get Roles in select in REQUEST TRAINING
                    self.rolelist([]);
                    // console.log(reasons);
                    var rolist = reasons.roles;
                    for (var i = 0; i < rolist.length; i++) {

                        self.rolelist.push({
                            name: rolist[i].name,
                            id: rolist[i].id
                        })
                    }// console.log(ko.toJSON(self.rolelist()));
                });
            }

            getRoleData();

            //-----------------   COMMUNITY CALL   ------------------------//
            //Development url for create, edit, clone and delete community call
            self.callname = ko.observable('');
            self.callduration = ko.observable('');
            self.comCallDate = ko.observable();
            self.calldesc = ko.observable('');
            self.callrecordlink = ko.observable('');
            self.selectedrole = ko.observableArray([]);
            self.selectedcallmode = ko.observableArray([]);
            self.callmodes = ko.observableArray(['Virtual', 'Town Hall']);
            self.organizerEmail = ko.observable('');
            self.topic = ko.observable('');
            self.com_call_keyevent = ko.observable('');

            resetcall = function () {
                self.callname('');
                self.comCallDate('');
                self.calldesc('');
                self.callrecordlink('');
                self.selectedrole([]);
                self.organizerEmail('');
                self.topic('');
                self.com_call_keyevent(false);
                self.selectedcallmode('');
                self.callduration('');
            }

            // CREATE COMMUNITY CALL
            createcommunitycall = function () {
                var selectedrole = '';
                var selectedcallmode = '';

                if (self.callname().length == 0) {
                    alert("Please enter Community call name");
                    return;
                }
                if (self.topic().length == 0) {
                    alert("Please enter topic");
                    return;
                }
                if (self.selectedrole().length == 0) {
                    alert("Please select role");
                }                
                if (self.selectedcallmode().length == 0) {
                    alert("Please select mode of delivary");
                }
                if (self.callduration().length == 0) {

                    alert("Please enter duration");
                    return;
                }      
                if (self.comCallDate().length == 0) {

                    alert("Please select date and time");
                    return;
                }   
                if (self.organizerEmail().length == 0) {

                    alert("Please enter organizer email");
                    return;
                }   

                if(editor_instance_data.length==0){
                    self.showToastDialog("Please enter some description.",0);
                    return;
                }

                if(!isUnderCharacterLimit(editor_instance_data)){
                    return;
                }

                selectedrole = ko.toJSON(self.selectedrole()).replace('[', '').replace(']', '').replace(/"/g, '');
                selectedcallmode = ko.toJSON(self.selectedcallmode()).replace('[', '').replace(']', '').replace(/"/g, '');
                var com_call_dt = self.comCallDate().replace("T", " ");
                var desc_data = CKEDITOR.instances.communitycall_text.getData();
                var call = {
                    name: self.callname(),
                    topic: self.topic(),
                    role: selectedrole,
                    mode_of_call: selectedcallmode,
                    call_date: com_call_dt,//self.date().split('T')[0],
                    duration: self.callduration(),
                    organizer_email: self.organizerEmail(),
                    recording_link: self.callrecordlink(),
                    keyevent: self.com_call_keyevent()!=true?'No':'Yes' ,
                    description: editor_instance_data,//$('#communitycall_text').val(),
                    user: ssoemail
                }
                console.log("create com call : "+ko.toJSON(call));
                $.ajax({
                    url: community_call_url,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(call),
                    success: function (data) {
                        resetcall();
                        loadCommunitycall();
                        fetchkeydates();
                        $("#createcommunitycall_id").ojDialog("close");
                        self.showToastDialog("Community call created successfully!",2000);
                        
                    }
                }).fail(function (xhr, textStatus, err) {
                    // alert(err);
                    $("#createcommunitycall_id").ojDialog("close");
                    self.showToastDialog("Community call creation failed!",0);
                });
                editor_instance_data = "";
                
            }

            opendescriptionmodal = function () {
                   editor_instance = CKEDITOR.instances.communitycall_text;
                   //using below variable to restore data of desc field on modal close(secondary modal)
                    if (editor_instance) {
                        intermediate_data = editor_instance_data;
                        editor_instance.destroy(true); 
                    }   

                    CKEDITOR.replace('communitycall_text', {
                        height: 500,
                        removePlugins: 'maximize'
                    });  
                    $( "#modaldesc" ).on( "ojbeforeclose", function( event, ui )
                    {
                        editor_instance_data = CKEDITOR.instances.communitycall_text.getData();
                    } );

                CKEDITOR.instances.communitycall_text.setData(intermediate_data);
                $("#modaldesc").ojDialog("open");
                                   
            }

            openEditComCallDescriptionModal = function () {

                   editor_instance = CKEDITOR.instances.edit_com_call_editor;
                    //using below variable to restore data of desc field on modal close(secondary modal)
                    if (editor_instance) {
                        intermediate_data = editor_instance_data;
                        editor_instance.destroy(true); 
                    }   

                    CKEDITOR.replace('edit_com_call_editor', {
                        height: 500,
                        removePlugins: 'maximize'
                    });  
                    $( "#editcomcall_desc_modal" ).on( "ojbeforeclose", function( event, ui )
                    {
                        editor_instance_data = CKEDITOR.instances.edit_com_call_editor.getData();
                    } );
                    CKEDITOR.instances.edit_com_call_editor.setData(intermediate_data);
                    $("#editcomcall_desc_modal").ojDialog("open");
                                   
            } 

                openCloneComCallDescriptionModal = function () {

                   editor_instance = CKEDITOR.instances.clone_com_call_editor;
                    //using below variable to restore data of desc field on modal close(secondary modal)
                    if (editor_instance) {
                        intermediate_data = editor_instance_data;
                        editor_instance.destroy(true); 
                    }   

                    CKEDITOR.replace('clone_com_call_editor', {
                        height: 500,
                        removePlugins: 'maximize'
                    });  
                    $( "#clonecomcall_desc_modal" ).on( "ojbeforeclose", function( event, ui )
                    {
                        editor_instance_data = CKEDITOR.instances.clone_com_call_editor.getData();
                    } );
                    CKEDITOR.instances.clone_com_call_editor.setData(intermediate_data);
                    $("#clonecomcall_desc_modal").ojDialog("open");
                                   
            }   

                openEventDescriptionModal = function () {

                   editor_instance = CKEDITOR.instances.event_editor;
                    //using below variable to restore data of desc field on modal close(secondary modal)
                    if (editor_instance) {
                        intermediate_data = editor_instance_data;
                        editor_instance.destroy(true); 
                    }   

                    CKEDITOR.replace('event_editor', {
                        height: 500,
                        removePlugins: 'maximize'
                    });  
                    $( "#event_desc_modal" ).on( "ojbeforeclose", function( event, ui )
                    {
                        editor_instance_data = CKEDITOR.instances.event_editor.getData();
                    } );
                    CKEDITOR.instances.event_editor.setData(intermediate_data);
                    $("#event_desc_modal").ojDialog("open");
                                   
            }      

            isUnderCharacterLimit=function(text){

                var pass=true;
                if(text.length>20000){
                    self.showToastDialog("Please keep the description text below 20000 characters. Current character count "+text.length);
                    pass=false;
                }
                return pass;
            }
                openCourseDescriptionModal = function () {

                   //var editor_instance2 = CKEDITOR.instances.course_editor;

                   if(CKEDITOR.instances.course_editor){
                    intermediate_data2 = editor_instance_data2;
                    CKEDITOR.instances.course_editor.destroy(true);
                   }
                   
                    intermediate_data2 = editor_instance_data2;
                    CKEDITOR.replace('course_editor', {
                        height: 500,
                        removePlugins: 'maximize'
                        
                    });  
                    $( "#course_modal" ).on( "ojbeforeclose", function( event, ui )
                    {
                        //alert("--------");
                        editor_instance_data2 = CKEDITOR.instances.course_editor.getData();

                        isUnderCharacterLimit(editor_instance_data2);
                    } );
                    CKEDITOR.instances.course_editor.setData(intermediate_data2);
                    $("#course_modal").ojDialog("open");
                                   
                }      

                openAddClassDescriptionModal = function () {

                    //using below variable to restore data of desc field on modal close(secondary modal)
                    if (CKEDITOR.instances.add_class_editor) {
                        intermediate_data1 = editor_instance_data1;
                        CKEDITOR.instances.add_class_editor.destroy(true); 
                    }   
                    intermediate_data1 = editor_instance_data1;

                    CKEDITOR.replace('add_class_editor', {
                        height: 500,
                        removePlugins: 'maximize'
                    });  
                    $( "#add_class_modal" ).on( "ojbeforeclose", function( event, ui )
                    {
                        editor_instance_data1 = CKEDITOR.instances.add_class_editor.getData();
                        isUnderCharacterLimit(editor_instance_data1);
                    } );
                    CKEDITOR.instances.add_class_editor.setData(intermediate_data1);
                    $("#add_class_modal").ojDialog("open");
                                   
            }   

                openEditCourseDescriptionModal = function () {

                   if(CKEDITOR.instances.edit_course_editor){
                    intermediate_data3 = editor_instance_data3;
                    CKEDITOR.instances.edit_course_editor.destroy(true);
                   }
                   
                    intermediate_data3 = editor_instance_data3;
                    CKEDITOR.replace('edit_course_editor', {
                        height: 500,
                        removePlugins: 'maximize'
                    });  
                    $( "#edit_course_modal" ).on( "ojbeforeclose", function( event, ui )
                    {
                        //alert("--------");
                        editor_instance_data3 = CKEDITOR.instances.edit_course_editor.getData();
                        isUnderCharacterLimit(editor_instance_data3);
                    } );
                    CKEDITOR.instances.edit_course_editor.setData(intermediate_data3);
                    $("#edit_course_modal").ojDialog("open");
                                   
            }  
            openEditClassDescriptionModal = function () {

                    //using below variable to restore data of desc field on modal close(secondary modal)
                    if (CKEDITOR.instances.edit_class_editor) {
                        intermediate_data4 = editor_instance_data4;
                        CKEDITOR.instances.edit_class_editor.destroy(true); 
                    }   
                    intermediate_data4 = editor_instance_data4;

                    CKEDITOR.replace('edit_class_editor', {
                        height: 500,
                        removePlugins: 'maximize'
                    });  
                    $( "#edit_class_modal" ).on( "ojbeforeclose", function( event, ui )
                    {
                        editor_instance_data4 = CKEDITOR.instances.edit_class_editor.getData();
                        isUnderCharacterLimit(editor_instance_data4);
                    } );
                    CKEDITOR.instances.edit_class_editor.setData(intermediate_data4);
                    $("#edit_class_modal").ojDialog("open");
                                   
            } 

            //----------------------- END OF COMMUNITY CALL  ---------------------//
            openCommunityCallDialog = function () {
                //CKEDITOR.replace('communitycall_text'); 
                // CKEDITOR.replace( 'communitycall_text', {
                //     language: 'fr',
                //     uiColor: '#9AB8F3',
                //     height: 500
                // }); 

                //below code is used to clear the desc field on main modal of create com call
                editor_instance = CKEDITOR.instances.communitycall_text;

                    if (editor_instance) {
                        editor_instance.destroy(true); 
                    }
                    editor_instance_data = "";   

                //     CKEDITOR.replace('communitycall_text', {
                //         uiColor: '#9AB8F3',
                //         height: 500,
                //         //removePlugins: 'maximize'
                //     });  
                $('#createcommunitycall_id').ojDialog("open");

            }


            //------------------   CATEGORY  -------------------//


            // GET THE CATEGORIES
            getcategories = function () {
                $.getJSON(trainingbaseurl + "getCategories").
                then(function (reasons) {
                    self.categories([]);
                    self.subcategories([]);
                    self.roles([]);
                    var currentroles = reasons.roles;

                    for (var i = 0; i < currentroles.length; i++) {
                        var role = {
                            value: currentroles[i].name,
                            label: currentroles[i].name
                        }
                        var categories = currentroles[i].Suites;
                        for (var j = 0; j < categories.length; j++) {
                            var category = {
                                parent: currentroles[i].name,
                                value: categories[j].name,
                                label: categories[j].name
                            }
                            var subcategories = categories[j].Services;
                            for (var k = 0; k < subcategories.length; k++) {

                                var subcategory = {
                                    parent: categories[j].name,
                                    value: subcategories[k].name,
                                    label: subcategories[k].name
                                }
                                self.subcategories().push(subcategory);
                            }
                            self.categories().push(category);
                        }
                        self.roles().push(role);
                    }

                    self.rolebasedcategory(self.categories());
                    self.categorybasedsubcategory(self.subcategories());
                });
            }

            searchdata = function (nameKey, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                    if (myArray[i].id === nameKey) {
                        return myArray[i].name;
                    }
                }
            }
            //  VARIABLES FOR LEFT PANEL CATEGORIES 
            self.refinelist = ko.observableArray([]);
            self.catlist = ko.observableArray([]);
            self.producttype = ko.observableArray([]);
            self.training_levels = ko.observableArray([]);
            self.training_types = ko.observableArray([]);
            self.cities = ko.observableArray([]);
            self.roles = ko.observableArray([]);
            self.selectedcategories = ko.observableArray([]);
            self.rl = ko.observableArray([]);

            getLeftpanelData = function () {
                $.getJSON(trainingbaseurl + "getFiltersV2").
                then(function (reasons) {

                    // CATEGORIES
                    self.refinelist([]);
                    var categorlist = reasons.categories;
                    for (var i = 0; i < categorlist.length; i++) {

                        self.refinelist.push({
                            name: categorlist[i].name,
                            id: categorlist[i].id
                        })
                    }

                    // PRODUCT TYPE
                    self.producttype([]);
                    var product_typesList = reasons.product_types;
                    for (var i = 0; i < product_typesList.length; i++) {

                        self.producttype.push({
                            name: product_typesList[i],
                            id: product_typesList[i]
                        })
                    }

                    //  TRAINING LEVELS
                    self.training_levels([]);
                    var training_levelList = reasons.training_levels;
                    for (var i = 0; i < training_levelList.length; i++) {

                        self.training_levels.push({
                            name: training_levelList[i],
                            id: training_levelList[i]
                        })
                    }


                    // TRAINING TYPES
                    self.training_types([]);
                    var training_typeList = reasons.training_types;
                    for (var i = 0; i < training_typeList.length; i++) {

                        self.training_types.push({
                            name: training_typeList[i],
                            id: training_typeList[i]
                        })
                    }

                    // CITIES
                    self.cities([]);
                    var cityList = reasons.cities;
                    for (var i = 0; i < cityList.length; i++) {

                        self.cities.push({
                            name: cityList[i],
                            id: cityList[i]
                        })
                    }

                    // ROLES
                    self.roles([]);
                    var stateList = reasons.roles;
                    for (var i = 0; i < stateList.length; i++) {

                        self.roles.push({
                            name: stateList[i].name,
                            id: stateList[i].id
                        })
                    }
                });
            }

            getLeftpanelData();

            // RESET CATEGORY FIELD
            resetcat = function () {
                self.role('');
                self.category('');
                self.subcategory('');
            }

            // CREATE CATEGORY
            createcategory = function () {

                if (self.role().length == 0) {
                    alert("Please select role.");
                    return;
                }
                if (self.category().length > 0 && self.role().length == 0) {
                    alert("Please select role before you select category.");
                    return;
                }
                if (self.subcategory().length > 0 && self.category().length == 0) {
                    alert("Please select Category before you select Sub-Category.");
                    return;
                }

                var catagory = {
                    role: self.role(),
                    suite: self.category(),
                    service: self.subcategory()
                }


                var url = 'https://apex.oraclecorp.com/pls/apex/se_cloud_ready_training/training/createCategory';

                $.ajax({
                    url: url,
                    cache: false,
                    type: 'POST',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("role", self.role());
                        xhr.setRequestHeader("suite", self.category());
                        xhr.setRequestHeader("service", self.subcategory());
                    },
                    success: function (data) {
                        resetcat();
                        getcategories();
                    }
                }).fail(function (xhr, textStatus, err) {
                    // alert(err);
                });

            }

            /*----------------------------------PLACEHOLDER SELECT ROLE POPUP----------------------------------*/
            self.emptyPlaceholder = ko.observable(false);


            self.closeRole = function () {
                $("#modalDialog1").ojDialog("close")
            };

            //EVENT HANDLE FOR CATEGORY SELECTION
            self.openReqtraining = function () {
                self.rtrname(ssoemail);
                self.refinesel([]);
                self.rtrsel([]);
                $("#trainingDialog").ojDialog("open");
            };


            /*----------------------------------GET COURSES----------------------------------*/
            self.role = ko.observableArray([]);
            self.getrole = function () {
                $.getJSON(trainingbaseurl + "getCategories").then(function (roleslist) //CODE FOR THE ROLE POPUP
                    {
                        for (var i = 0; i < roleslist.roles.length; i++) {
                            var filt = roleslist.roles[i].name;
                            self.role.push({
                                value: filt,
                                label: filt
                            });
                        }
                        var selectedrole = sessionStorage.getItem('role');
                        if (selectedrole == null) {
                            $("#modalDialog1").ojDialog("open");
                        } else {
                            self.selectedrole({
                                selectedrole
                            });
                            self.fetchcourses();
                        }

                    });
            }

            // CLOSE THE COURSE DETAILS SCREEN
            self.closecoursedetails = function () {

                $("#coursedetails").ojDialog("close");
            }

            // READ THE COURSE IF FROM THE URL, IF EXIST WE NEED TO SHOW THE DETAILS SCREEN
            self.getCourseIdFromUrl = function () {

                var courseid = "";
                if (window.location.hash) {
                    courseid = window.location.hash.replace('#', '');
                    if (courseid.trim().length > 0) {
                        // alert(courseid);
                        self.getCourseDetailsAndShow(courseid);
                    }
                }
            }


            // GET THE COURSE DETAILS FROM A LIST AND 
            self.getCourseDetailsAndShow = function (courseIdForDetails) {
                showcoursedetails(findCourseById(courseIdForDetails), "");
            }

            // FIND COURSE BY COURSE ID
            findCourseById = function (courseid) {
                // ITERATE THROUGH THE LIST OF COURSES TO FIND A MATCH FOR THE COURSE ID
                for (var i = 0; i < self.courselist.length; i++) {
                    var course = self.courselist[i];
                    // console.log(course.course_id);
                    if (course.course_id === courseid) {
                        return course;
                    }
                }

            }


            // SHOW DETAILED DESCRIPTION
            self.detailedDescription = ko.observable();
            self.detailedName = ko.observable();
            self.detailedCourseId = ko.observable();
            self.detailedClassId = ko.observable();
            self.detailedCatId = ko.observable();
            self.detailedCatName = ko.observable();
            self.detailedSubCatName = ko.observable();
            self.detailedSubCatId = ko.observable();
            self.detailedRoles = ko.observable();
            self.detailedEnrollstatus = ko.observable();
            self.detailedClassSize = ko.observable();
            self.detailedprodcut_type = ko.observable();
            self.detailedTrainingLevel = ko.observable();
            self.detailedTrainingType = ko.observable();
            self.detailedClasses = ko.observableArray([]);
            self.detailedContact = ko.observable();
            self.detailedCity = ko.observable();
            self.detailedstate = ko.observable();
            self.coursestatus = ko.observable();
            self.classstatus = ko.observable();
            self.classkey_event = ko.observable(false);
            self.enrollCount = ko.observable();
            self.waitlistcount = ko.observable();
            self.detailedSchedule = ko.observableArray([]);


            showcoursedetails = function (course, param2) {

                function waitForElement(id, callback){
                    var wait_for_community_call = setInterval(function(){
                        if(document.getElementById(id)){
                            clearInterval(wait_for_community_call);
                            callback();
                        }
                    }, 100);
                }

                waitForElement("course_details", function(){
                        $('#course_details').trigger('click');
                
                });


                self.detailedDescription('');
                self.detailedName('');
                self.detailedCatName('');
                self.detailedSubCatName('');
                self.detailedprodcut_type('');
                self.detailedTrainingLevel('');
                self.detailedTrainingType('');
                self.detailedContact('');
                self.detailedCity('');
                self.detailedstate('');
                self.detailedClasses([]);
                self.enrollCount('');
                self.waitlistcount('');
                self.detailedCourseId('');
                self.detailedClassId('');
                self.detailedCatId('');
                self.detailedSubCatId('');
                self.detailedRoles('');
                self.detailedClassSize('');
                self.coursestatus('');
                self.classstatus('');
                self.classkey_event(false);
                self.detailedSchedule([]);
                self.detailedEnrollstatus('');


                // SET NEW VALUE
                self.detailedDescription(course.description);
                self.detailedName(course.name);
                self.detailedCatName(course.category_name);
                self.detailedSubCatName(course.subcat_name);
                self.detailedprodcut_type(course.prodcut_type);
                self.detailedTrainingLevel(course.training_level);
                self.detailedTrainingType(course.training_type);
                self.detailedClasses(course.classes);
                self.detailedContact(course.contact);
                self.detailedCity(course.city);
                self.detailedstate(course.state);
                self.enrollCount(course.enrollmentCount);
                self.detailedEnrollstatus(course.enrollment_status);
                self.waitlistcount(course.waitlistCount);
                self.detailedCourseId(course.course_id);
                self.detailedClassId(course.class_id);
                self.detailedCatId(course.category_id);
                self.detailedSubCatId(course.subcat_id);
                self.detailedRoles('');
                self.detailedClassSize(course.class_size);
                self.coursestatus(course.course_status);
                self.classstatus(course.class_status);
                self.detailedSchedule(course.schedules);
                self.selectedcourseid = course.course_id;

                console.log(course.classes);

                // CREATE COURSE LINK
                var courselink = window.location.href;
                var first_param = "=training";
                courselink = courselink.substr(0,courselink.indexOf(first_param)+first_param.length);
                courselink += "#" + course.course_id;
                $(".directlink").empty();
                if (true) {
                    $(".directlink").append("<b>Direct Link: <span>" + courselink + "</span></b>");
                }
                console.log(courselink);
                analytics(course.name, course.category_name, 'View_details', 'Training Page', 'Training Courses', course.category_name);
                $("#coursedetails").ojDialog("open");
            }


            searchcourses = function () {
                if(self.switchadminview()){
                    alert("This feature is diabled in Admin Mode");
                    return;
                }
                self.searchfetchcourses();
            }
            /*-----------------------   GET COURSES LIST   ----------------------*/

            self.categories = ko.observableArray([]);
            self.courseslistbycat = ko.observableArray();
            self.schedules = ko.observableArray([]);
            self.searchtext = ko.observableArray([]);
            self.fetchcourses = function () {
                $.ajax({
                    url: trainingbaseurl + "getCoursesV2",
                    method: 'GET',
                    headers: {
                        free_text_search: '',
                        email: ssoemail,
                        admin_view:self.switchadminview()==true?'Yes':'No'
                    },
                    success: function (allcourses) {
                        self.courselist = allcourses.courses;
                        self.processCoursesFromService(allcourses.courses);
                        self.getCourseIdFromUrl();
                        console.log(allcourses);
                    },
                    error: function (xhr) {
                        // alert(xhr);
                    }
                });
            }
            self.fetchcourses();

            self.resetCourseFilters = function () {
                if(self.switchadminview()){
                    alert("This feature is diabled in Admin Mode");
                    return;
                }
                setuncheck('category');
                setuncheck('prodtype');
                setuncheck('traininglevel');
                setuncheck('trainingtype');
                setuncheck('cities');
                setuncheck('roles');
                self.refinecategories([]);
                self.refineproducttype([]);
                self.refinetraininglevel([]);
                self.refinetrainingtype([]);
                self.refinecitis([]);
                self.refineroles([]);

                self.fetchcourses();
            }

            self.searchfetchcourses = function () {
                if (self.searchtext().length == 0) {
                    alert("Enter text to search");
                    return;
                } else {
                    //console.log("whoa", self.searchtext());
                    var text = self.searchtext().length > 0 ? self.searchtext() : '';
                    $.ajax({
                        url: trainingbaseurl + "getCoursesV2",
                        method: 'GET',
                        headers: {
                            free_text_search: text,
                            email: ssoemail
                        },
                        success: function (allcourses) {
                            self.courselist = allcourses.courses;
                            self.processCoursesFromService(allcourses.courses);
                            self.getCourseIdFromUrl();
                        },
                        error: function (xhr) {
                            alert(xhr);
                        }
                    });
                }
            }

            // self.refinecourses = function () {
            //     if(self.switchadminview()){
            //         alert("This feature is diabled in Admin Mode");
            //         return;
            //     }
            //     var selectedcategories = ko.toJSON(self.refinecategories()).replace('[', '').replace(']', '').replace(/"/g, '');
            //     var selectedproductypes = ko.toJSON(self.refineproducttype()).replace('[', '').replace(']', '').replace(/"/g, '');
            //     var selectedtraininglevels = ko.toJSON(self.refinetraininglevel()).replace('[', '').replace(']', '').replace(/"/g, '');
            //     var selectedtrainingtypes = ko.toJSON(self.refinetrainingtype()).replace('[', '').replace(']', '').replace(/"/g, '');
            //     var selectedcitis = ko.toJSON(self.refinecitis()).replace('[', '').replace(']', '').replace(/"/g, '');
            //     var selectedroles = ko.toJSON(self.refineroles()).replace('[', '').replace(']', '').replace(/"/g, '');
            //     var headerobj = {
            //         category_id: selectedcategories,
            //         product_type: selectedproductypes,
            //         training_level: selectedtraininglevels,
            //         training_type: selectedtrainingtypes,
            //         city: selectedcitis,
            //         role_id: selectedroles
            //     }
            //     // searchanalytics('', self.refinecitis()[0], self.refineroles()[0], '', 'TR');
            //     searchanalytics('', self.refinecitis()[0], self.refineroles()[0], self.refinecategories()[0], 'TR');
            //     $.ajax({
            //         url: trainingbaseurl + "getCoursesV2",
            //         method: 'GET',
            //         headers: headerobj,
            //         success: function (allcourses) {
            //             self.processCoursesFromService(allcourses.courses);
            //         },
            //         error: function (xhr) {
            //             // alert(xhr);
            //         }
            //     });
            // }

            self.refinecourses = function () {
                if (self.switchadminview()) {
                    alert("This feature is diabled in Admin Mode");
                    return;
                }

                var text = self.searchtext().length > 0 ? self.searchtext()[0] : '';
                
                var selectedcategories = ko.toJSON(self.refinecategories()).replace('[', '').replace(']', '').replace(/"/g, '');
                var selectedproductypes = ko.toJSON(self.refineproducttype()).replace('[', '').replace(']', '').replace(/"/g, '');
                var selectedtraininglevels = ko.toJSON(self.refinetraininglevel()).replace('[', '').replace(']', '').replace(/"/g, '');
                var selectedtrainingtypes = ko.toJSON(self.refinetrainingtype()).replace('[', '').replace(']', '').replace(/"/g, '');
                var selectedcitis = ko.toJSON(self.refinecitis()).replace('[', '').replace(']', '').replace(/"/g, '');
                var selectedroles = ko.toJSON(self.refineroles()).replace('[', '').replace(']', '').replace(/"/g, '');
                var headerobj = {
                    category_id: selectedcategories,
                    product_type: selectedproductypes,
                    training_level: selectedtraininglevels,
                    training_type: selectedtrainingtypes,
                    city: selectedcitis,
                    role_id: selectedroles,
                    free_text_search: text
                }
                var refinetrrole = searchdata(selectedroles, self.roles());
                var refinetrcategories = searchdata(selectedcategories, self.refinelist());
                if (refinetrrole && refinetrcategories) {
                    searchanalytics(text, selectedcitis, refinetrrole, refinetrcategories, 'TR');
                }
                else if (refinetrrole) {
                    searchanalytics(text, selectedcitis, refinetrrole, '', 'TR');
                }
                else if (refinetrcategories) {
                    searchanalytics(text, selectedcitis, '', refinetrcategories, 'TR');
                }
                
		$.ajax({
                    url: trainingbaseurl + "getCoursesV2",
                    method: 'GET',
                    headers: headerobj,
                    success: function (allcourses) {
                        self.processCoursesFromService(allcourses.courses);
                    },
                    error: function (xhr) {
                        console.log(xhr);
                    }
                });
            }

            // The method maintains the filters based on use selection
            //  Method triggers on each option selection
            refineupdate = function (desc) {
                var type = desc.name;
                if (desc.checked) {

                    switch (type) {
                        case "category":
                            setuncheck('category');
                            desc.checked = true;
                            self.refinecategories.removeAll();
                            self.refinecategories.push(desc.defaultValue);
                            break;

                        case "prodtype":
                            setuncheck('prodtype');
                            desc.checked = true;
                            self.refineproducttype.removeAll();
                            self.refineproducttype.push(desc.defaultValue);
                            break;

                        case "traininglevel":
                            setuncheck('traininglevel');
                            desc.checked = true;
                            self.refinetraininglevel.removeAll();
                            self.refinetraininglevel.push(desc.defaultValue);
                            break;

                        case "trainingtype":
                            setuncheck('trainingtype');
                            desc.checked = true;
                            self.refinetrainingtype.removeAll();
                            self.refinetrainingtype.push(desc.defaultValue);
                            break;

                        case "cities":
                            setuncheck('cities');
                            desc.checked = true;
                            self.refinecitis.removeAll();
                            self.refinecitis.push(desc.defaultValue);
                            break;

                        case "roles":

                            setuncheck('roles');
                            desc.checked = true;
                            self.refineroles.removeAll();
                            self.refineroles.push(desc.defaultValue);
                            break;

                        case "community_roles":
                            self.refinecommunitycallroles.push(desc.defaultValue);
                            break;

                        case "communitymodes":
                            self.refinecommunitycallmodes.push(desc.defaultValue);
                            break;

                        case "past":
                            self.refinepastcalls.push(desc.defaultValue);
                            break;

                        case "reporttype":
                            self.event_report_type.push(desc.defaultValue);
                            break;

                        case "reportdays":
                            setuncheck('reportdays');
                            desc.checked = true;
                            self.event_report_no_days.removeAll();
                            self.event_report_no_days.push(desc.defaultValue);
                            break;

                        case "reportkeyevent":
                            self.event_report_key_event.push(desc.defaultValue);
                            break;
                    }


                } else {
                    switch (type) {
                        case "category":
                            self.refinecategories.remove(desc.defaultValue);
                            break;

                        case "prodtype":
                            self.refineproducttype.remove(desc.defaultValue);
                            break;

                        case "traininglevel":
                            self.refinetraininglevel.remove(desc.defaultValue);
                            break;

                        case "trainingtype":
                            self.refinetrainingtype.remove(desc.defaultValue);
                            break;

                        case "cities":
                            self.refinecitis.remove(desc.defaultValue);
                            break;

                        case "roles":
                            self.refineroles.remove(desc.defaultValue);
                            break;

                        case "community_roles":
                            self.refinecommunitycallroles.remove(desc.defaultValue);
                            break;

                        case "communitymodes":
                            self.refinecommunitycallmodes.remove(desc.defaultValue);
                            break;

                        case "past":
                            self.refinepastcalls.remove(desc.defaultValue);
                            break;
                        
                        case "reporttype":
                            self.event_report_type.remove(desc.defaultValue);
                            break;
                            
                        case "reportdays":
                            self.event_report_no_days.remove(desc.defaultValue);
                            break;
                            
                        case "reportkeyevent":
                            self.event_report_key_event.remove(desc.defaultValue);
                            break;
                    }

                }
            }

            setuncheck = function (classname) {
                var x = document.getElementsByClassName(classname);
                for (var i = 0; i < x.length; i++) {
                    x[i].checked = false;
                }
            }

            self.processCoursesFromService = function (allcourses) {

                self.categories([]);
                for (var k = 0; k < allcourses.length; k++) {
                    startday = ''; //allcourses.courses[k].schedule[0];
                    var curcourse = allcourses[k];
                    var catagorylist = curcourse.categories;
                    var category_all_List=curcourse.categories_all;
                    var catlistString = ko.toJSON(self.refinecategories());
                    var enrolled = "";
                    if (curcourse.classes.length > 0) {
                        var classCount = curcourse.classes.length;
                        for (var i = 0; i < classCount; i++) {
                            if(curcourse.classes[i].enrollment_status==undefined){
                                curcourse.classes[i].enrollment_status="Not Enrolled";
                            }
                            if (curcourse.classes[i].enrollment_status != "Not Enrolled") {
                                enrolled = curcourse.classes[i].enrollment_status;
                                break;
                            }
                        }
                    }

                    for (var i = 0; i < catagorylist.length; i++) {
                        var categoryname = catagorylist[i].name;
                        var catid = catagorylist[i].category_id;
                        var categoryAllId=category_all_List[i].category_id;
                        var categoryAllName=category_all_List[i].name;
                        if (catlistString.length == 2 || catlistString.indexOf(catid) != -1) {
                            var categoryobj = self.getcategorybyname(categoryname);
                            categoryobj.courses.push({
                                name: curcourse.name,
                                description: curcourse.description,
                                subdescription: curcourse.description!=undefined?curcourse.description.substring(0, 120) + '...':'',
                                class_size: curcourse.class_size,
                                prodcut_type: curcourse.prodcut_type,
                                training_level: curcourse.training_level,
                                training_type: curcourse.training_type,
                                category_name: categoryname,
                                categoryid: curcourse.category_id,
                                subcat_name: curcourse.subcat_name,
                                classes: curcourse.classes,
                                roles: curcourse.roles,
                                isenrolled: enrolled,
                                subcat_id: curcourse.subcat_id,
                                start_date: startday == undefined ? "NA" : startday.start_date,
                                directURL: curcourse.directURL,
                                course_id: curcourse.course_id,
                                class_id: curcourse.class_id,
                                contact_email: curcourse.contact,
                                city: curcourse.city,
                                state: curcourse.state,
                                course_status: curcourse.course_status,
                                class_status: curcourse.class_status,
                                enrollmentCount: curcourse.enrollmentCount,
                                waitlistCount: curcourse.waitlistCount,
                                schedules: curcourse.schedules
                            });
                        }
                    }
                }
                // console.log(ko.toJSON(self.categories()));
                updateCourseClass();
				checkadmin();
            }


            self.getcategorybyname = function (catname) {
                // Look if the category is already present in the array
                for (var i = 0; i < self.categories().length; i++) {
                    if (self.categories()[i].name === catname) {
                        return self.categories()[i];
                    }
                }
                // Category is not present so we need to insert the category in the array
                self.categories.push({
                    name: catname,
                    courses: ko.observableArray([])
                });
                var lastindex = self.categories().length - 1;
                return self.categories()[lastindex];
            }
            /*------------------------------  END  ------------------------------*/

            /*----------------------------------SEARCH----------------------------------*/

            /*----------------------------------FLIP----------------------------------*/

            // Keep track of whether the front or back is showing
            self.showingFront = true;

            self.showBack = function () {
                var elem = document.getElementById('animatable');

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



            // CHECK FOR ADMIN RIGHTS
            checkadminrights = function () {
                console.log('admin checked');
                if (isAdmin) {
                    $("#tabs").ojTabs({
                        "disabledTabs": [5, 6]
                    });
                    console.log("Showing for admin");
                    $(".admin").css("display", "inline-block");

                } else {
                    $("#tabs").ojTabs({
                        "disabledTabs": [5, 6, 7]
                    });
                    console.log("Hiding from user");
                    // $(".admin").css("display", "none");
                    // $('.admin').hide();
                    var appBanners = document.getElementsByClassName('admin'), i;
                    
                    for (var i = 0; i < appBanners.length; i ++) {
                        appBanners[i].style.display = 'none';
                    }
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




            self.showFront = function () {

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


            self.handleBindingsApplied = function (info) {
                // checkadminrights();
            };


            self.handleDetached = function (info) {
                // checkadminrights();
            };

            
            self.handleAttached = function (info) {
                self.event_report_type.push('COMMUNITY_CALLS');
                self.event_report_type.push('EVENT');
                self.event_report_type.push('TRAINING');
                self.event_report_no_days.push('15');
                loadEventReportData();
                checkadminrights();
                getStates();
            };

            /*----------------------------------SEARCH----------------------------------*/
            self.currentValue = ko.observableArray();
            self.currentRawValue = ko.observable();
            self.buttonDisabled = ko.observable(true);
            self.searchInput = function () {};

            /* ---------------------   EVENTS TAB START  -------------------------*/
            self.event_no = ko.observable('');
            self.event_name = ko.observable('');
            self.event_description = ko.observable('');
            self.event_location = ko.observable('');
            self.event_starttime = ko.observable('');
            self.event_endtime = ko.observable('');
            self.is_key_event = ko.observable('');
            self.customerName = ko.observable('');
            // self.eventFeedback = ko.observable('');
            self.eventLead = ko.observable('');
            self.partnerName = ko.observable('');
            self.registrationLink = ko.observable('');

            self.eventsList = ko.observableArray([]);

            function ordinal_suffix_of(i) {
                var j = i % 10,
                    k = i % 100;
                if (j == 1 && k != 11) {
                    return i + "st";
                }
                if (j == 2 && k != 12) {
                    return i + "nd";
                }
                if (j == 3 && k != 13) {
                    return i + "rd";
                }
                return i + "th";
            }

            var monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ];      
            var event_error_tracker;
            eventValidation = function () {
                event_error_tracker = 0;
                if (self.event_name().length == 0) {
                    event_error_tracker++;
                    alert("Please enter name of event");
                }
                else if (self.event_location().length == 0) {
                    event_error_tracker++;
                    alert("Please enter location of event");
                }
                else if (self.event_starttime().length == 0) {
                    event_error_tracker++;
                    alert("Please enter start date and time of event");
                }
                else if (self.event_endtime().length == 0) {
                    event_error_tracker++;
                    alert("Please enter end date and time of event");
                }
            }

            // GET EVENTS START
            getAllEvents = function () {
                var all_events = events_api + "/$-$";
                $.getJSON(all_events).then(function (data) {
                        var events = data.items;
                        self.eventsList([]);
                        var event_date;
                        for (var i = 0; i < events.length; i++) {
                            if (events[i].start_time != undefined){
                                var date_number = events[i].start_time.split('T')[0].substring(8,10);
                                var month_no = events[i].start_time.split('T')[0].substring(5,7);
                                var month_name = monthNames[month_no-1];
                                var year = events[i].start_time.split('T')[0].substring(0,4);
                                event_date = ordinal_suffix_of(date_number)+" "+month_name+" "+year;
                            }
                            self.eventsList.push({
                                event_no: events[i].event_no != undefined ? events[i].event_no : '',
                                name: events[i].name != undefined ? events[i].name : '',
                                description: events[i].description != undefined ? events[i].description : '',
                                location: events[i].location != undefined ? events[i].location : '',
                                date: event_date,
                                time: events[i].start_time != undefined ? events[i].start_time.split('T')[1].substring(0,5) : '',
                                //below fields are to get these data while clone,edit
                                customer_name: events[i].customer_name != undefined ? events[i].customer_name : '',
                                key_event_value_check: events[i].keyevent != 'No' ? true : false,
                                start_time: events[i].start_time != undefined ? events[i].start_time : '',
                                end_time: events[i].end_time != undefined ? events[i].end_time : '',
                                // event_feedback: events[i].event_feedback != undefined ? events[i].event_feedback : '',
                                event_lead: events[i].event_lead != undefined ? events[i].event_lead : '',
                                partner_name: events[i].partner_name != undefined ? events[i].partner_name : '',
                                registration_link: events[i].link != undefined ? events[i].link : ''

                            });
                        }checkadminrights();
                    });
            }

            getAllEvents();

            // GET EVENTS END
            eventCKInstance = function () {
               editor_instance = CKEDITOR.instances.event_editor;
                if (editor_instance) {
                    editor_instance.destroy(true); 
                }   
                CKEDITOR.replace('event_editor', {
                    uiColor: '#9AB8F3',
                    height: 350,
                    removePlugins: 'maximize'
                });      
            }
            // var edit_ck_desc = CKEDITOR.instances.event_editor.getData();
            //CREATE EVENTS START
            createEvent = function() {
                // eventValidation();
                // if(event_error_tracker > 0)
                //     return;
                if (self.event_name().length == 0) {
                    self.showToastDialog("Please enter an Event name",0);
                    return;
                }

                if (self.event_location().length == 0) {
                    self.showToastDialog("Please enter a location.",0);
                    return;
                }

                if (self.event_starttime().length == 0) {
                    self.showToastDialog("Please select a valid Start Date.",0);
                    return;
                }else if (self.event_endtime().length == 0) {
                    self.showToastDialog("Please select a valid End Date.",0);
                    return;
                }else if (new Date(self.event_starttime()) >= new Date(self.event_endtime())) {
                    self.showToastDialog("End Date should be greater than Start Date.",0);
                    return;
                }

                if(CKEDITOR.instances.event_editor.getData().length==0){
                    self.showToastDialog("Please enter some description.",0);
                    return;
                }

                if(!isUnderCharacterLimit(CKEDITOR.instances.event_editor.getData())){
                    return;
                }
                sdatetime = self.event_starttime().replace("T", " ")
                edatetime = self.event_endtime().replace("T", " ")
                var create_event_data = {
                    name: self.event_name(),
                    location: self.event_location(),
                    start_time: sdatetime,
                    end_time: edatetime,
                    description: CKEDITOR.instances.event_editor.getData(),//self.event_description(),
                    key_event: self.is_key_event()!=true?'No':'Yes',
                    customer_name:self.customerName(),
                    // event_feedback:self.eventFeedback(),
                    event_lead: self.eventLead(),
                    partner_name: self.partnerName(),
                    link: self.registrationLink()
                }
                console.log("created data : "+ko.toJSON(create_event_data));
                $.ajax({
                    url: create_event_api,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(create_event_data),
                    success: function (data) {
                        getAllEvents();
                        resetEvent();
                        fetchkeydates();
                        self.showToastDialog("Event created successfully!",2000);
                    }
                    }).fail(function (xhr, textStatus, err) {
                        self.showToastDialog("Event creation failed!",0);
                    });
                $("#createevents_id").ojDialog("close");
            }
            //CREATE EVENTS END

            openCreateEventDialog = function() {
                editor_instance = CKEDITOR.instances.event_editor;

                if (editor_instance) {
                    editor_instance.destroy(true); 
                }
                editor_instance_data = "";   

                resetEvent();
                $('#clone_modal_footer').hide();
                $('#edit_modal_footer').hide();
                $('#create_modal_footer').show();
                $('#edit_desc_event').hide();
                $('#add_desc_event').show();
                $("#createevents_id" ).ojDialog( {title: "Create Event" } );   
                eventCKInstance();
                $('#createevents_id').ojDialog("open");
            }

            resetEvent = function(){
            self.event_name('');
            self.event_description('');
            self.event_location('');
            self.event_starttime('');
            self.event_endtime('');
            self.is_key_event('');
            self.customerName('');
            // self.eventFeedback('');
            self.eventLead('');
            self.partnerName('');
            self.registrationLink('');
            }
          
            eventDeleteConfimation = function (delete_id) {
                console.log("deleting event-" + delete_id);
                var data_value = {
                    "event_no": delete_id
                };
                $("#delete_event_modal").ojDialog("open");
                $("#delete_event_button").click(function () {
                    $.ajax({
                        url: create_event_api,
                        method: 'DELETE',
                        contentType: 'application/json; charset=utf-8',
                        data: ko.toJSON(data_value),
                        success: function () {
                            getAllEvents();
                            closeEventDeleteModal();
                            self.showToastDialog("Event deleted successfully!",2000);
                        },
                        fail: function (xhr, textStatus, err) {
                            self.showToastDialog("Event deletion failed!",0);
                            console.log(err);
                        },
                        error: function (xhr, textStatus, err) {
                            self.showToastDialog("Event deletion failed!",0);
                            console.log(err);
                        }
                    });
                });

            }            

            deleteEvent = function(event_delete){
                eventDeleteConfimation(event_delete.event_no);
            }            
            
            closeEventDeleteModal = function () {
                $("#delete_event_modal").ojDialog("close");
            }

            cloneEvent = function () {
                // eventValidation();
                // if(event_error_tracker > 0)
                //     return;
                sdatetime = self.event_starttime().replace("T", " ").replace("Z", "");
                edatetime = self.event_endtime().replace("T", " ").replace("Z", "");
                var clone_event_data = {
                    name: self.event_name(),
                    location: self.event_location(),
                    start_time: sdatetime,
                    end_time: edatetime,
                    description: editor_instance_data,//CKEDITOR.instances.event_editor.getData(),//self.event_description(),
                    key_event: self.is_key_event()!=true?'No':'Yes',
                    customer_name:self.customerName(),
                    // event_feedback:self.eventFeedback(),
                    event_lead: self.eventLead(),
                    partner_name: self.partnerName(),
                    link: self.registrationLink()
                }
                console.log("clone event data : "+ko.toJSON(clone_event_data));
                $.ajax({
                    url: create_event_api,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(clone_event_data),
                    success: function (data) {
                        getAllEvents();
                        resetEvent();
                        self.showToastDialog("Event cloned successfully!",2000);
                    }
                }).fail(function (xhr, textStatus, err) {
                    self.showToastDialog("Event cloning failed!",0);
                });
                $("#createevents_id").ojDialog("close");                
            }
            
            openCloneEventModal = function (clone_event) {
                self.event_name(clone_event.name);
                self.event_description(clone_event.description);
                editor_instance_data = clone_event.description;
                //$('#event_editor').froalaEditor('html.set', clone_event.description);
                self.event_location(clone_event.location);
                self.event_starttime(clone_event.start_time);
                self.event_endtime(clone_event.end_time);
                self.is_key_event(clone_event.key_event_value_check);
                self.customerName(clone_event.customer_name);
                // self.eventFeedback(clone_event.event_feedback);
                self.eventLead(clone_event.event_lead);
                self.partnerName(clone_event.partner_name);
                self.registrationLink(clone_event.registration_link);
                $("#create_modal_footer").hide();
                $("#edit_modal_footer").hide();
                $("#clone_modal_footer").show();
                $("#add_desc_event").hide();
                $("#edit_desc_event").show();
                $("#createevents_id" ).ojDialog( {title: "Clone Event" } );     
                eventCKInstance();
                $("#createevents_id").ojDialog("open");
            }
            var event_no_for_edit;
            openEditEventModal = function (edit_event) {
                self.event_name(edit_event.name);
                self.event_description(edit_event.description);
                editor_instance_data = edit_event.description;
                //$('#event_editor').froalaEditor('html.set', edit_event.description);
                self.event_location(edit_event.location);
                self.event_starttime(edit_event.start_time);
                self.event_endtime(edit_event.end_time);
                self.is_key_event(edit_event.key_event_value_check);
                self.customerName(edit_event.customer_name);
                // self.eventFeedback(edit_event.event_feedback);
                self.eventLead(edit_event.event_lead);
                self.partnerName(edit_event.partner_name);
                self.registrationLink(edit_event.registration_link);
                event_no_for_edit = edit_event.event_no;
                $("#create_modal_footer").hide();
                $("#clone_modal_footer").hide();
                $("#edit_modal_footer").show();
                $('#add_desc_event').hide();
                $('#edit_desc_event').show();
                $("#createevents_id" ).ojDialog( {title: "Edit Event" } );
                eventCKInstance();
                $("#createevents_id").ojDialog("open");
                
            }

            editEvent = function () {
                // eventValidation();
                // if(event_error_tracker > 0)
                //     return;
                sdatetime = self.event_starttime().replace("T", " ").replace("Z", "");
                edatetime = self.event_endtime().replace("T", " ").replace("Z", "");

                if (self.event_name().length == 0) {
                    self.showToastDialog("Please enter an Event name",0);
                    return;
                }

                if (self.event_location().length == 0) {
                    self.showToastDialog("Please enter a location.",0);
                    return;
                }

                if (self.event_starttime().length == 0) {
                    self.showToastDialog("Please select a valid Start Date.",0);
                    return;
                }else if (self.event_endtime().length == 0) {
                    self.showToastDialog("Please select a valid End Date.",0);
                    return;
                }else if (new Date(self.event_starttime()) >= new Date(self.event_endtime())) {
                    self.showToastDialog("End Date should be greater than Start Date.",0);
                    return;
                }


                if(editor_instance_data.length==0){
                    self.showToastDialog("Please enter some description.",0);
                    return;
                }

                if(!isUnderCharacterLimit(editor_instance_data)){
                    return;
                }
                
                var edit_event_data = {
                    event_no: event_no_for_edit,
                    name: self.event_name(),
                    location: self.event_location(),
                    start_time: sdatetime,
                    end_time: edatetime,
                    description: editor_instance_data,//CKEDITOR.instances.event_editor.getData(),//self.event_description(),
                    key_event: self.is_key_event()!=true?'No':'Yes',
                    customer_name:self.customerName(),
                    // event_feedback:self.eventFeedback(),
                    event_lead: self.eventLead(),
                    partner_name: self.partnerName(),
                    link: self.registrationLink()
                }
                console.log("edit event data : "+ko.toJSON(edit_event_data));
                $.ajax({
                    url: create_event_api,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(edit_event_data),
                    success: function (data) {
                        getAllEvents();
                        resetEvent();
                        fetchkeydates();
                        self.showToastDialog("Event updated successfully!",2000);
                    }
                    }).fail(function (xhr, textStatus, err) {
                        self.showToastDialog("Event update failed!",0);
                    });
                $("#createevents_id").ojDialog("close");                

            }

            showEventDetails = function (event_details) {
                self.event_name(event_details.name);
                self.event_description(event_details.description);
                self.event_location(event_details.location);
                self.event_starttime(event_details.start_time);
                self.event_endtime(event_details.end_time);
                self.is_key_event(event_details.key_event_value_check);
                self.customerName(event_details.customer_name);
                // self.eventFeedback(event_details.event_feedback);
                self.eventLead(event_details.event_lead);
                self.partnerName(event_details.partner_name);
                self.registrationLink(event_details.registration_link);
                $("#event_details_modal").ojDialog("open");
                analytics(event_details.name, event_details.location, 'View_details', 'Training Page', 'Events', 'Event Details');
            }            

            /* ---------------------   EVENTS TAB END  -------------------------*/
            /*----------------------------------SEARCH----------------------------------*/
            function waitForElement(id, callback){
                var wait_for_community_call = setInterval(function(){
                    if(document.getElementById(id)){
                        clearInterval(wait_for_community_call);
                        callback();
                    }
                }, 100);
            }

            waitForElement("com_call_tab", function(){
                var call_id_val1 = window.location.href;
                // com_call_id is getting used to go directly to an old community call which doesnt 
                //have a reply link. key_com_call is to navigate to key events com call from home page
                var is_com_call_id_text_present = call_id_val1.indexOf("com_call_id");
                var is_key_com_call_text_present = call_id_val1.indexOf("key_com_call");
                if (is_com_call_id_text_present != -1 || is_key_com_call_text_present !=-1){
                    $('#com_call_tab').trigger('click');
                }                
               
            });
            waitForElement("events_tab", function(){
                var call_id_val1 = window.location.href;
                // com_call_id is getting used to go directly to an old community call which doesnt 
                //have a reply link. key_com_call is to navigate to key events com call from home page
                var is_event_id_text_present = call_id_val1.indexOf("events_tab_trigger");
                if (is_event_id_text_present != -1){
                    $('#events_tab').trigger('click');
                }                
               
            });

            
            waitForElement("events_report", function(){
				if (window.location.href.indexOf("tab") != -1) 
            {
                var type = window.location.href.split('tab=');
                var hash = '';
                if (type.length > 1)
                {
					
                    hash = '#'+type[1];
                }
               $(hash).trigger('click'); 
            }
              });


            /* ---------------------   COMMUNITY CALLS  -------------------------*/

            // GET THE LIST OF COMUNITY CALLS
            getCommunityCalls = function (texttosearch) {
                var get_com_call_link = com_call_api + texttosearch;
                $.getJSON(get_com_call_link).then(function (data) {
                    var calls = data.items;
                    self.communityCallList([]);
                    self.searchcallstext([]);
                    for (var i = 0; i < calls.length; i++) {
                         var date_only = calls[i].call_date.substr(0,10);
                         var time_only = calls[i].call_date.substr(11,19);
                        self.communityCallList.push({
                            name: calls[i].name != undefined ? calls[i].name : '',
                            speaker: calls[i].speaker != undefined ? calls[i].speaker : '',
                            designation: calls[i].designation != undefined ? calls[i].designation : '',
                            call_date: calls[i].call_date != undefined ? calls[i].call_date : '',
                            call_time: calls[i].call_time != undefined ? calls[i].call_time.substring(0, 5) + " PT" : '',
                            callduration: calls[i].duration != undefined ? calls[i].duration + " mins" : 'NA',
                            location: calls[i].locn != undefined ? calls[i].locn : '',
                            meetinglink: calls[i].meetinglink != undefined ? calls[i].meetinglink : '',
                            dialin: calls[i].dialin != undefined ? calls[i].dialin : '',
                            description: calls[i].description != undefined ? calls[i].description : '',
                            mode_of_call: calls[i].mode_of_call != undefined ? calls[i].mode_of_call.replace('$', ',') : '',
                            role: calls[i].role != undefined ? ko.toJSON(calls[i].role).replace('[', '').replace(']', '').replace(/"/g, '') : '',
                            recording_link: calls[i].recording_link != undefined ? calls[i].recording_link : '',
                            addl_link: calls[i].addl_link != undefined ? calls[i].addl_link : '',
                            subdescription: calls[i].description != undefined ? calls[i].description.substring(0, 150) + '...' : '',
                            organizer_email: calls[i].organizer_email != undefined ? calls[i].organizer_email : '',
                            topic: calls[i].topic != undefined ? calls[i].topic : '',
                            com_call_home_datetime : calls[i].call_date != undefined ? calls[i].call_date.replace("T"," ").replace("Z","") : '',
                            /*invite: calls[i].invite != undefined ? calls[i].invite : '',*/
                            invite: calls[i].call_id != undefined ? community_call_calendar_link+"/"+calls[i].call_id : '',
                            call_id: calls[i].call_id != undefined ? calls[i].call_id : '',
                            key_event_value: calls[i].keyevent != 'No' ? true : false
                        }); 
                            if (new Date(date_only+" "+time_only) < new Date()){
                                $(".cal_invite").hide();
                                $(".rec_link").show();
                            }else{
                                 $(".rec_link").hide();
                                 $(".cal_invite").show();
                        }

                    }checkadminrights();
                });
            }


            // SHOW DETAILED DESCRIPTION
            self.ccId = ko.observable();
            self.ccName = ko.observable();
            self.ccDate = ko.observable();
            self.ccSpeaker = ko.observable();
            self.ccDesignation = ko.observable();
            self.ccCallType = ko.observable();
            self.ccMeetingLink = ko.observable();
            self.ccRoles = ko.observable();
            self.ccDescription = ko.observable();
            self.ccDialin = ko.observable();
            self.ccAdditionalLinks = ko.observable();
            self.ccRecordingLinks = ko.observable();
            self.ccOrganizerEmail = ko.observable();
            self.ccTopic = ko.observable();
            self.ccInvite = ko.observable();


            showcommunitycallsdetails = function (ccalls) {
                // SET NEW VALUE
                self.ccDescription(ccalls.description);
                $("#communitycallsdetails").ojDialog("open");
                analytics(ccalls.name, ccalls.call_id, 'View_details', 'Training Page', 'Community Calls', 'Community Calls Details');
            }

            self.closecommunitycallsdetails = function () {
                $("#communitycallsdetails").ojDialog("close");
            }

            self.resetsearch = function () {
                getCommunityCalls('GetCommunityCallDetails');
                self.searchcallstext([]);
                self.refinecommunitycallroles([]);
                self.refinecommunitycallmodes([]);
                self.refinecommunitycallroles([]);
                setuncheck("refine");
            }

            self.editccName = ko.observable();
            self.editccDate = ko.observable();
            self.editccDuration = ko.observable();
            self.editccCallType = ko.observableArray([]);
            self.editccSelectedRoles = ko.observableArray([]);
            self.editccDescription = ko.observable();
            self.editccRecordingLinks = ko.observable();
            self.editccOrganizerEmail = ko.observable();
            self.editccTopic = ko.observable();
            self.edit_com_call_keyevent = ko.observable('');

            var edit_call_id;
            editcommunitycall = function (edit_calls, param) {
                     if (editor_instance) {
                        editor_instance.destroy(true); 
                    } 
                self.editccName('');
                self.editccDate('');
                self.editccDuration('');
                self.editccCallType([]);
                self.editccSelectedRoles([])
                self.editccDescription('');
                self.editccRecordingLinks('');
                self.editccOrganizerEmail('');
                self.editccTopic('');
                self.edit_com_call_keyevent('');

                // SET NEW VALUE
                self.editccName(edit_calls.name);
                self.editccDate(edit_calls.call_date);
                self.editccDuration(edit_calls.callduration);
                var callTypeString = edit_calls.mode_of_call;
                var callTypeArray = callTypeString.split(",");
                self.editccCallType(callTypeArray);
                var roleString = edit_calls.role;
                var roleArray = [];
                roleArray = roleString.split(",");
                self.editccSelectedRoles(roleArray)
                self.editccDescription(edit_calls.description);
                editor_instance_data = edit_calls.description;
                //$('#edit_com_call_editor').froalaEditor('html.set', edit_calls.description);
                self.editccRecordingLinks(edit_calls.recording_link);
                self.editccOrganizerEmail(edit_calls.organizer_email);
                self.editccTopic(edit_calls.topic);
                edit_call_id = edit_calls.call_id;
                self.edit_com_call_keyevent(edit_calls.key_event_value);

                $("#editcommunitycall_id").ojDialog("open");
                
            }

            editCommunityCallValues = function () {
                editSelectedRole = ko.toJSON(self.editccSelectedRoles()).replace('[', '').replace(']', '').replace(/"/g, '');
                editSelectedCallMode = ko.toJSON(self.editccCallType()).replace('[', '').replace(']', '').replace(/"/g, '');
                //var editor_data = CKEDITOR.instances.edit_com_call_editor.getData();//$('#edit_com_call_editor').val();
                
                if(editor_instance_data.length==0){
                    self.showToastDialog("Please enter some description.",0);
                    return;
                }

                if(!isUnderCharacterLimit(editor_instance_data)){
                    return;
                }

                var edit_community_call_data = {

                    NAME: self.editccName(),
                    call_date: self.editccDate().replace("T", " ").replace("Z",""),
                    duration: self.editccDuration().substring(0, 2),
                    description: editor_instance_data,//editor_data,//self.editccDescription(),
                    user: ssoemail,
                    recording_link: self.editccRecordingLinks(),
                    mode_of_call: editSelectedCallMode,
                    role: editSelectedRole,
                    organizer_email: self.editccOrganizerEmail(),
                    topic: self.editccTopic(),
                    call_id: edit_call_id,
                    keyevent: self.edit_com_call_keyevent()!=true?'No':'Yes'

                }
                console.log("edit data : "+ko.toJSON(edit_community_call_data));
                $.ajax({
                    url: community_call_url,
                    cache: false,
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(edit_community_call_data),
                    success: function (data) {
                        console.log("edit success");
                        loadCommunitycall();
                        fetchkeydates();
                        self.showToastDialog("Community call updated successfully!",2000);
                    },
                    fail: function (xhr, textStatus, err) {
                        console.log("failed" + err);
                        self.showToastDialog("Community call update failed!",0);
                    },
                    error: function (xhr, textStatus, err) {
                        console.log("error" + err);
                        self.showToastDialog("Community call update failed!",0);
                    }
                });
                editor_instance_data = "";
                $("#editcommunitycall_id").ojDialog("close");

            }

            openDeleteModal = function (delete_id) {
                console.log("deleting id-" + delete_id);
                var data_value = {
                    "call_id": delete_id
                };
                $("#delete_community_call").ojDialog("open");
                $("#delete_com_call").click(function () {
                    $.ajax({
                        url: community_call_url,
                        method: 'DELETE',
                        contentType: 'application/json; charset=utf-8',
                        data: ko.toJSON(data_value),
                        success: function () {
                            loadCommunitycall();
                            closeDeleteModal();
                            console.log("delete success");
                            self.showToastDialog("Community call deleted successfully!",2000);
                        },
                        fail: function (xhr, textStatus, err) {
                            console.log(err);
                            self.showToastDialog("Community call deletion failed!",0);
                        },
                        error: function (xhr, textStatus, err) {
                            console.log(err);
                            self.showToastDialog("Community call deletion failed!",0);
                        }
                    });
                });

            }

            deleteCommunityCall = function (com_delete) {
                openDeleteModal(com_delete.call_id);

            }

            closeDeleteModal = function () {
                $("#delete_community_call").ojDialog("close");
            }


            // clone communitycallsdetails
            self.cloneccName = ko.observable();
            self.cloneccDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.cloneccTime = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.cloneccDuration = ko.observable();
            self.cloneccVenue = ko.observable();
            self.cloneccSpeaker = ko.observable();
            self.cloneccDesignation = ko.observable();
            self.cloneccCallType = ko.observableArray([]);
            self.cloneccMeetingLink = ko.observable();
            self.cloneccSelectedRoles = ko.observableArray([]);
            self.cloneccDescription = ko.observable();
            self.cloneccDialin = ko.observable();
            self.cloneccAdditionalLinks = ko.observable();
            self.cloneccRecordingLinks = ko.observable();

            self.cloneccOrganizerEmail = ko.observable();
            self.cloneccTopic = ko.observable();
            self.cloneccInvite = ko.observable();
            self.clone_com_call_keyevent = ko.observable('');

            cloneCommunityCall = function (clone_calls, param2) {
                    if (editor_instance) {
                        editor_instance.destroy(true); 
                    } 
                self.cloneccName('');
                self.cloneccDate('');
                self.cloneccDuration('');
                self.cloneccCallType([]);
                self.cloneccSelectedRoles([])
                self.cloneccDescription('');
                self.cloneccRecordingLinks('');
                self.cloneccOrganizerEmail('');
                self.cloneccTopic('');
                self.clone_com_call_keyevent('');

                // SET NEW VALUE
                self.cloneccName(clone_calls.name);
                self.cloneccDate(clone_calls.call_date);
                self.cloneccDuration(clone_calls.callduration);
                self.cloneccSpeaker(clone_calls.speaker);
                var callTypeString = clone_calls.mode_of_call;
                var callTypeArray = callTypeString.split(",");
                self.cloneccCallType(callTypeArray);
                self.cloneccMeetingLink(clone_calls.meetinglink);
                var roleString = clone_calls.role;
                var roleArray = [];
                roleArray = roleString.split(",");
                self.cloneccSelectedRoles(roleArray);
                self.cloneccDescription(clone_calls.description);
                editor_instance_data = clone_calls.description;
                //$('#clone_com_call_editor').froalaEditor('html.set', clone_calls.description);
                self.cloneccRecordingLinks(clone_calls.recording_link);
                self.cloneccOrganizerEmail(clone_calls.organizer_email);
                self.cloneccTopic(clone_calls.topic);
                self.clone_com_call_keyevent(clone_calls.key_event_value);

                $("#clonecommunitycall_id").ojDialog("open");

            }


            // CREATE CLONE COMMUNITY CALL
            createclonecommunitycall = function () {
                var selectedrole = '';
                var selectedcallmode = '';

                if (self.cloneccName().length == 0) {
                    alert("Please enter Community call name");
                    return;
                }

                if (self.cloneccDescription().length == 0) {

                    alert("Please enter description");
                    return;
                }
                if (self.cloneccSelectedRoles().length == 0) {

                    alert("Select atleast one role");
                    return;
                }

                if (self.cloneccDuration().length == 0) {

                    alert("Please enter duration");
                    return;
                }
                //  else if (typeof self.cloneccDuration() == 'number') {
                //     alert("Please enter valid duration in minute(s)");
                //     return;
                // }

                if (self.cloneccCallType().length == 0) {
                    alert("Please select mode of delivary");
                }

                if(editor_instance_data.length==0){
                    self.showToastDialog("Please enter some description.",0);
                    return;
                }

                if(!isUnderCharacterLimit(editor_instance_data)){
                    return;
                }
                cloneSelectedrole = ko.toJSON(self.cloneccSelectedRoles()).replace('[', '').replace(']', '').replace(/"/g, '');
                cloneSelectedcallmode = ko.toJSON(self.cloneccCallType()).replace('[', '').replace(']', '').replace(/"/g, '');
                //var clone_editor_data = CKEDITOR.instances.clone_com_call_editor.getData();//$('#clone_com_call_editor').val();
                var clone_call = {
                    name: self.cloneccName(),
                    call_date: self.cloneccDate().replace("T", " ").replace("Z",""),
                    duration: self.cloneccDuration().substring(0, 2),
                    description: editor_instance_data,//clone_editor_data,//self.cloneccDescription(),
                    user: ssoemail,
                    recording_link: self.cloneccRecordingLinks(),
                    mode_of_call: cloneSelectedcallmode,
                    role: cloneSelectedrole,
                    organizer_email: self.cloneccOrganizerEmail(),
                    topic: self.cloneccTopic(),
                    keyevent: self.clone_com_call_keyevent()!=true?'No':'Yes'
                }
                console.log("clone data : "+ko.toJSON(clone_call));
                $.ajax({
                    url: community_call_url,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(clone_call),
                    success: function (data) {
                        loadCommunitycall();
                        self.showToastDialog("Community call cloned successfully!",2000);

                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log("error during clone" + err);
                    self.showToastDialog("Community call clone failed!",0);
                });
                editor_instance_data ="";
                $("#clonecommunitycall_id").ojDialog("close");

            }

            searchanalytics = function (searchtext, cities, roles, categories, calltype) {
                var analytics = {
                    "SESSION_ID": sessionid,
                    "SEARCH_TEXT": searchtext,
                    "CITIES": cities,
                    "ROLES": roles,
                    "CATEGORIES": categories,
                    "CALL_TYPE": calltype,
                    "USER_EMAIL": ssoemail
                };
                console.log(analytics);
                $.ajax({
                    url: homebaseurl + 'POST_EVENT_SEARCH',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(analytics),
                    success: function (event) {
                        console.log("Analytics of event sent.", event);
                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log("Error in sending analytics", err);
                });
                return true;
            }

            self.searchcallstext = ko.observable('');
            //  SEARCH COMMUNITY CALLS
            searchcommunitycalls = function () {
                var searchtext = '$-$' + ko.toJSON(self.searchcallstext()).replace('[', '').replace(']', '').replace(/"/g, '');
                var roles = '$-$' + ko.toJSON(self.refinecommunitycallroles()).replace('[', '').replace(']', '').replace(/"/g, '');
                var callmodel = '$-$' + ko.toJSON(self.refinecommunitycallmodes()).replace('[', '').replace(']', '').replace(/"/g, '');
                var past = '$-$' + ko.toJSON(self.refinepastcalls()).replace('[', '').replace(']', '').replace(/"/g, '');
                
                var call_id_val = window.location.href;
                var index_of = call_id_val.indexOf("com_call_id");
                var call_id_data = call_id_val.substr(index_of+12);
                var key_com_call_from_home = call_id_val.indexOf("key_com_call");
                var call_id_data_from_home = call_id_val.substr(key_com_call_from_home+13);

                if (call_id_data*1 != call_id_data){
                    call_id_data = '$-$';
                }
                var apex_link;
                apex_link = 'GetCommunityCallDetailsOnFreetextSearch/' + searchtext + '/' + past + '/' + callmodel + '/' + roles + '/' +call_id_data;
                //below apex_link is to get all past community call with and without replay link.
                if (call_id_data != '$-$'){
                    apex_link = 'GetCommunityCallDetailsOnFreetextSearch/' + searchtext + '/' + 'other_than_$-$' + '/' + callmodel + '/' + roles + '/' +call_id_data;
                }
                if(key_com_call_from_home != -1){
                    call_id_data = call_id_data_from_home;
                    apex_link = 'GetCommunityCallDetailsOnFreetextSearch/$-$/$-$/$-$/$-$/' + call_id_data;     
                }//console.log("apex_link : "+apex_link)
                getCommunityCalls(apex_link);
 		            var refinerole = self.refinecommunitycallroles()[0];
                var refinesearchtext = self.searchcallstext()[0];              
                if (self.searchcallstext()[0] && self.refinecommunitycallroles()[0])
                {
                    searchanalytics(refinesearchtext, '', refinerole, '', 'CC');
                }
                else if (self.searchcallstext()[0])
                {
                    searchanalytics(refinesearchtext, '', '', '', 'CC');
                }
                else if (self.refinecommunitycallroles()[0]) 
                {
                    searchanalytics('', '', refinerole, '', 'CC');
                }
                else
                {
                    return;
                }       
            }

            loadCommunitycall = function () {
                
                self.searchcallstext('');
                self.refinecommunitycallroles([]);
                self.refinecommunitycallmodes([]);
                self.refinepastcalls([]);
                searchcommunitycalls();
                setuncheck("refine");
            }
            loadCommunitycall();
            // events report start
            
            refineEventReport = function () {
                var checkbox_value = [];
                $(":checkbox").each(function () {
                    var ischecked = $(this).is(":checked");
                    if (ischecked) {
                        checkbox_value.push($(this).val());
                    }
                });
            }
            

//             loadEventReportData = function () {
//                 var checkbox_value = [];
//                 $(":checkbox").each(function () {
//                     var ischecked = $(this).is(":checked");
//                     if (ischecked) {
//                         checkbox_value.push($(this).val());
//                     }
//                 });

//                 $.getJSON(event_report_api).then(function (data) {
//                     var calls = data.items;
//                     self.event_report_list([]);
//                     for (var i = 0; i < calls.length; i++) {
//                         if(checkbox_value.length > 0 ){

// for(var j=0; j<checkbox_value.length; j++) {

//                             if (checkbox_value[j] == parseInt(checkbox_value[j] , 10)){
//                                 var date1 = new Date(calls[i].start_date.substr(0,10));
//                                 var date2 = new Date();
//                                 var timeDiff = Math.abs(date2.getTime() - date1.getTime());
//                                 var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
//                                 if(diffDays <= checkbox_value[j]){
//                                     self.event_report_list.push({
//                                         training_type: calls[i].training_type != undefined ? calls[i].training_type : '',
//                                         name: calls[i].name != undefined ? calls[i].name : '',
//                                         start_date: calls[i].start_date != undefined ? calls[i].start_date.substr(0,10) : '',
//                                         start_time: calls[i].start_date != undefined ? calls[i].start_date.substr(11,5) : '',
//                                     });    
//                                 }
//                             }

//                             else if(checkbox_value[j] == calls[i].training_type) {
//                                 self.event_report_list.push({
//                                     training_type: calls[i].training_type != undefined ? calls[i].training_type : '',
//                                     name: calls[i].name != undefined ? calls[i].name : '',
//                                     start_date: calls[i].start_date != undefined ? calls[i].start_date.substr(0,10) : '',
//                                     start_time: calls[i].start_date != undefined ? calls[i].start_date.substr(11,5) : '',
//                                         });    
//                                     }

//                                 }
//                             }
//                         }
//                     });
//                 }


            loadEventReportData = function () {
    
                var eventreportparam="/";

                // READ SEARCH TEXT
                if(self.searcheventreportstext().length>0){
                    eventreportparam+=self.searcheventreportstext()+"/";
                }else{
                    eventreportparam+="$-$/";
                }

                // READ KEY_EVENT
                if(self.event_report_key_event().includes('1')){
                    eventreportparam+="Yes/";
                }else{
                    eventreportparam+="$-$/";
                }

                // READ REPORT TYPE

                if(self.event_report_type().length>0){
                    var eventreporttype =ko.toJSON(self.event_report_type()).replace('[', '').replace(']', '').replace(/"/g, '');
                    eventreportparam+=eventreporttype+"/";
                }else{
                    eventreportparam+="$-$/";
                }

                // READ REPORT TYPE

                if(self.event_report_no_days().length>0){
                    var eventreportnodays =ko.toJSON(self.event_report_no_days()).replace('[', '').replace(']', '').replace(/"/g, '');
                    eventreportparam+=eventreportnodays;
                }else{
                    eventreportparam+="$-$";
                }

                eventreportparam=eventreportparam.replace(/,/g, '\*');

                $.getJSON(event_report_api+eventreportparam).then(function (data) {
                    var calls = data.items;
                    self.event_report_list([]);
                    var gotoSpecificTraining;
                    for (var i = 0; i < calls.length; i++) {
                                    var genericLink = window.location.href;
                                    var query_param = "=training";
                                    genericLink = genericLink.substr(0,genericLink.indexOf(query_param)+query_param.length);

                                    if(calls[i].training_type == "COMMUNITY_CALLS"){
                                        gotoSpecificTraining = genericLink+"#key_com_call="+calls[i].id;
                                    }
                                    else if(calls[i].training_type == "EVENT"){
                                        gotoSpecificTraining = genericLink+"#events_tab_trigger="+calls[i].id;  
                                    }
                                    else if(calls[i].training_type == "TRAINING"){
                                        gotoSpecificTraining = genericLink+"#"+calls[i].id;
                                    }
                                    self.event_report_list.push({
                                        training_type: calls[i].training_type != undefined ? calls[i].training_type : '',
                                        name: calls[i].name != undefined ? calls[i].name : '',
                                        gotoTraining: gotoSpecificTraining,
                                        start_date: calls[i].start_date != undefined ? calls[i].start_date.substr(0,10) : '',
                                        start_time: calls[i].start_date != undefined ? calls[i].start_date.substr(11,5) : '',
                                    });    
                                }
                            });


                        }
            
            // events report end

            setssostatus = function (selector, visibility) {
                var nodes = document.querySelectorAll(selector),
                    node,
                    styleProperty = function (a, b) {
                        return window.getComputedStyle ? window.getComputedStyle(a).getPropertyValue(b) : a.currentStyle[b];
                    };

                [].forEach.call(nodes, function (a, b) {
                    node = a;

                    node.style.display = visibility;
                });
            }




            // ENROLL EMPLOYEE FOR A COURSE
            // enrollemployee = function (p1, p2, p3) {
            //     alert('Enroll');
            // }

            redirecttotrainingapp = function () {
                self.ssowindow = window.open("https://apex.oraclecorp.com/pls/apex/f?p=TRAINING_SCHEDULER:MANAGE_COURSE");
            }
            self.handleOKClose = function () {
                document.querySelector("#coursedetails").close();
            };


            getReporteeByEmail = function () {
                var checkurl = trainingbaseurl + "getOrganization";
                // ssoemail = "angan.sen@oracle.com";
                if (ssoemail.length > 0) {
                    console.log("Getting reportees. . .");
                    $.ajax({
                        url: checkurl,
                        method: 'GET',
                        headers: {
                            email: ssoemail,
                            level: 1000
                        },
                        success: function (data) {
                            var report = {
                                email: data.email,
                                first_name: data.first_name,
                                last_name: data.last_name
                            }
                            self.reporteelist.push(report);
                            console.log(self.reporteelist());
                            if (data.directs.length > 0) {
                                getEmployeeFromReportees(data.directs, self.reporteelist()[0]);
                            }

                        },
                        error: function (xhr) {
                            // alert(xhr);
                        }
                    });

                }
            }

            //  CONVERTING HIERARCHICAL ORAGINAZATION DATA TO LINEAR LIST OF EMPLOYEES
            function getEmployeeFromReportees(data, mgrdata) {
                self.reporteelist([]);
                for (var index = 0; index < data.length; index++) {
                    var report = {
                        email: data[index].email,
                        name: data[index].first_name + " " + data[index].last_name
                    }

                    self.reporteelist.push(report);
                    if (data[index].directs.lenght > 0) {
                        getEmployeeFromReportees(data[index]().directs);
                    }
                }
                var reportplus = {
                    email: mgrdata.email,
                    name: mgrdata.first_name + " " + mgrdata.last_name
                }
                self.reporteelist.push(reportplus);
                console.log(self.reporteelist());

            }



            //checkadminrights();
            // checkAdminPrivileges = function () {
                // setTimeout(function () {
                //     checkadminrights()
                // }, 3000);

            //     window.setInterval(function () {
            //         checkadminrights();
            //     }, 3000);
            // }


            // checkAdminPrivileges();
            checkadmin();
            getReporteeByEmail();

            enrollforCourse = function (emaillist) {
                if (emaillist.length > 0) {
                    // CREATE THE CLASS BODY
                    var classbody = {
                        course_id: self.selectedcourseid,
                        class_id: self.selectedclassid,
                        enrolled_by: ssoemail,
                        students: emaillist
                    };

                    var classarray = new Array();
                    classarray.push(classbody);

                    var enrollment = {
                        enrollments: classarray
                    }



                    var enrollurl = trainingbaseurl + "enrollStudents";
                    console.log("enrolled data : ",ko.toJSON(enrollment));
                    $.ajax({
                        url: enrollurl,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: ko.toJSON(enrollment),
                        success: function (data) {
                            //console.log(data);
                            self.failed([]);
                            self.success([]);
                            if (data.failed.length == 0 && data.success.length>0)
                            {
                                if (data.success.length == 1) 
                                {
                                    self.showToastDialog("Successfully Enrolled", 4000);
                                }
                                else
                                {
                                    for (var e = 0; e < data.success.length; e++) 
                                    {
                                        self.success.push(data.success[e]);
                                    }
                                    self.showEnrollToastDialog(self.success(),0); 
                                }
                            }
                            else if (data.failed.length > 0 && data.success.length == 0) 
                            {
                                if (data.failed.length == 1) 
                                {
                                    self.showToastDialog("You are already Enrolled", 4000);
                                }
                                else
                                {
                                    for (var f = 0; f < data.failed.length; f++) 
                                    {
                                        self.failed.push(data.failed[f]);
                                    }
                                    self.showEnrollToastDialog(self.failed(), 0); 
                                }
                            }
                            else if (data.failed.length > 0 && data.success.length > 0) 
                            {
                                for (var g = 0; g < data.success.length; g++) 
                                {
                                    self.success.push(data.success[g]);
                                }
                                for (var h = 0; h < data.failed.length; h++) 
                                {
                                    self.failed.push(data.failed[h]);
                                }      
                                self.showEnrollToastDialog(self.success(),self.failed(), 0)                            
                            }                         
                            if (self.searchtext().length == 0) 
                            {
                                self.fetchcourses();
                            } 
                            else 
                            {
                                self.searchfetchcourses();
                            }                           
                            $("#reportees").ojDialog("close");
                        }
                    }).fail(function (xhr, textStatus, err) {
                        self.showToastDialog("Enrollment Failed.", 0);
                        console.log(ko.toJSON(err));
                    });
                }

            }
            self.showToastDialog = function (msg, timeinmillisec) {
                self.msg(msg);
                $("#toastdiv").ojDialog("open");
                if (timeinmillisec>0) {
                    setTimeout(function () {
                        $("#toastdiv").ojDialog("close");
                    }, timeinmillisec);
                }
            }
            self.showEnrollToastDialog = function (msg1,msg2, timeinmillisec) {
                self.msg1(msg1);
                self.msg2(msg2);
                $("#enrolltoastdiv").ojDialog("open");
                if (timeinmillisec > 0) {
                    setTimeout(function () {
                        $("#enrolltoastdiv").ojDialog("close");
                    }, timeinmillisec);
                }
            }

            initEnroll = function (param) {
                self.selectreportees([]);
                self.selectedclassid = param.class_id;
                if (self.reporteelist().length > 1) {
                    $("#reportees").ojDialog("open");
                } else {
                    if (ssoemail.length > 0) {
                        self.selectreportees().push(ssoemail);
                        enrollforCourse(self.selectreportees());
                    } else {

                        self.showToastDialog("Please login to enroll", 0);
                    }
                }
            }
            sendErollmentRequest = function () {
                enrollforCourse(self.selectreportees());
            }

            self.openCreatetraining = function () {
                editor_instance = CKEDITOR.instances.course_editor;

                    if (editor_instance) {
                        editor_instance.destroy(true); 
                    }
                    editor_instance_data = "";                   

                resetCourse();
                // reset the old class list from the UI
                $(".classlist").empty();

                $("#createcoursedialog").ojDialog("open");
            }

            resetCourse = function () {
                self.createCourse().course_id('');
                self.createCourse().name('');
                self.createCourse().description('');
                self.createCourse().cloud_onpremise([]);
                self.createCourse().training_level([]);
                self.createCourse().training_type([]);
                self.createCourse().status([]);
                self.createCourse().contact_email('');
                self.createCourse().categories([]);
                self.createCourse().categories_all([]);
                self.selectedCategoriesForUi([]);
                resetClass();
            }

            resetClass = function () {
                self.cclass().class_id('');
                self.cclass().description('');
                self.cclass().class_size('');
                self.cclass().enrollment_end_date('');
                self.cclass().enrollment_end_date_view('');
                self.cclass().city('');
                self.cclass().state([]);
                self.cclass().status([]);
                self.cclass().key_event(false);
                resetSchedule();
                editor_instance_data4="";
                // $(".classlist").empty();
            }

            resetSchedule = function () {
                self.cclass().schedules([]);
                self.csdate('');
                self.cedate('');
                self.ctimezone([]);
                $(".addedschedule").empty();
            }

            // REQUEST COURSE CREATION BASED ON SAVED DATA
            self.createcourse = function () {
                console.log("Creating course . . .");
                if(self.selectedCategoriesForCourse().length==0){
                    self.showToastDialog("Please select Category for the course.",0);
                    return;
                }
                if(editor_instance_data2.length==0){
                    self.showToastDialog("Please enter some description.",0);
                    return;
                }

                if(!isUnderCharacterLimit(editor_instance_data2)){
                    return;
                }
                var mappedCategories = new Array();
                self.selectedCategoriesForCourse().forEach(function (element) {
                    mappedCategories.push(element.category_id);
                });
                self.cclass().status(self.cclass().status()[0]);
                self.cclass().state(self.cclass().state()[0]);

                var coursedata = {
                    name: self.createCourse().name(),
                    description: editor_instance_data2,//editor_instance_data,//$('#course_editor').val(),//self.createCourse().description(),
                    cloud_onpremise: self.createCourse().cloud_onpremise()[0],
                    training_level: self.createCourse().training_level()[0],
                    training_type: self.createCourse().training_type()[0],
                    status: self.createCourse().status()[0],
                    contact_email: self.createCourse().contact_email(),
                    categories: mappedCategories,
                    classes: self.createCourse().classes()
                }
                var courses = new Array();
                courses.push(coursedata);

                var reqBody = {
                    courses: courses
                }
                console.log("course data : "+ko.toJSON(reqBody));

                var url = trainingbaseurl + "createCourses";
                $.ajax({
                    url: url,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(reqBody),
                    success: function (data) {
                        
                        console.log("Course Successfully Created");
                        self.fetchcourses();
                        $("#createcoursedialog").ojDialog("close");
                        resetCourse();
                        console.log(ko.toJSON(data));
                        fetchkeydates();
                        self.showToastDialog("Course Successfully Created",2000);
                    }
                }).fail(function (xhr, textStatus, err) {
                    // alert(err);
                    self.showToastDialog("Course Creation Failed!", 0);
                });
                editor_instance_data2 = "";
            }

            


            getCategoryHierarchy = function () {
                $.getJSON(trainingbaseurl + "getCategories").
                then(function (response) {
                    var categoriesres = response.categories;
                    self.categoryForUi([]);
                    if (categoriesres.length > 0) {
                        processCategoryList(categoriesres, self.categoryForUi());
                    }
                    // console.log(ko.toJSON(self.categoryForUi()));
                });
            }

            processCategoryList = function (categories, childarray) {
                for (var i = 0; i < categories.length; i++) {
                    var item = {
                        title: categories[i].name,
                        attr: {
                            id: categories[i].id
                        }
                    }
                    if (categories[i].categories != undefined && categories[i].categories.length > 0) {
                        item.children = new Array();
                        processCategoryList(categories[i].categories, item.children);

                    }
                    childarray.push(item);
                }
            }


            function getJson(node) {
                return self.categoryForUi();
            };



            categorySelected = function (e, ui) {

                if (ui.value[0].id != undefined) {
                    self.selectedCategoriesForCourse.push({
                        category_id: ui.value[0].id,
                        name: ui.value[0].innerText
                    });
                    self.selectedCategoriesForUi.push(ui.value[0].innerText);
                    self.selectedCategoriesForUi.id = ui.value[0].innerText;

                }
            }

            selectedCategoryChanged = function (e, ui) {
                if (ui.previousValue != undefined && ui.previousValue.length > ui.value.length) {
                    var temparray = new Array();
                    for (var i = 0; i < self.selectedCategoriesForCourse().length; i++) {
                        if (ui.value.includes(self.selectedCategoriesForCourse()[i].name)) {
                            temparray.push(self.selectedCategoriesForCourse()[i]);
                        }
                    }
                    self.selectedCategoriesForCourse(temparray);
                }
            }

            self.state=ko.observableArray([]);
            getStates=function(){
                $.getJSON(trainingbaseurl + "getStates").
                then(function (response) {
                    self.state(response.states);
                });
            }

            openaddsclasswindow = function () {
                editor_instance = CKEDITOR.instances.add_class_editor;

                    if (editor_instance) {
                        editor_instance.destroy(true); 
                    }
                    editor_instance_data = "";  

                resetClass();
                $("#addclasstoclass").ojDialog("open");
            }

            addScheduleBlock = function () {
                $('#schedule').append($('#scheduleblock'));
                $('#scheduleblock').show();
            }

            // resetSchedule = function () {
            //     self.schedule().start_date('');
            //     self.schedule().end_date('');
            //     self.schedule().timezone([]);
            // }

            addschedule = function () {
                if (new Date(self.csdate()) >= new Date(self.cedate())) {
                    alert("End Date should be greater than Start Date");
                    return;
                }

                if (self.ctimezone().length == 0) {
                    alert("Please select a timezone.");
                    return;
                }

                self.cclass().schedules().push({
                    start_date: Date.parse(self.csdate()).toString('dd MMM yyyy HH:mm'),
                    end_date: Date.parse(self.cedate()).toString('dd MMM yyyy HH:mm'),
                    timezone: self.ctimezone()[0]
                });
                showScheduleBlock();
                console.log(ko.toJSON(self.cclass()));

            }
            showScheduleBlock = function () {
                var scheduledclass = "";
                $(".addedschedule").empty();
                for (var i = 0; i < self.cclass().schedules().length; i++) {
                    scheduledclass += "<li>" + self.cclass().schedules()[i].start_date + " to " + self.cclass().schedules()[i].end_date + " " + self.cclass().schedules()[i].timezone + " time  <span style=\"color:red;cursor:pointer\" onclick=\"deleteSchedule(" + i + ")\">X</span></li>";
                }
                $(".addedschedule").append(scheduledclass);
                // resetSchedule();
            }

            deleteSchedule = function (index) {
                self.cclass().schedules().splice(index, 1);
                showScheduleBlock();
                console.log(ko.toJSON(self.cclass()));
            }

            addClassTotheCourse = function () {
                if (self.cclass().schedules().length < 1) {
                    self.showToastDialog("Atleast create one schedule for the class", 0);
                    return;
                }

                if (self.cclass().class_size().length < 1) {
                    self.showToastDialog("Please enter valid class size.", 0);
                    return;
                }

                if (self.cclass().city().length < 1) {
                    self.showToastDialog("Please enter valid City.", 0);
                    return;
                }

                if(editor_instance_data1.length==0){
                    self.showToastDialog("Please enter some description.",0);
                    return;
                }

                if(!isUnderCharacterLimit(editor_instance_data1)){
                    return;
                }


                self.createCourse().classes().push({
                    description: editor_instance_data1,//$('#add_class_editor').val(),//self.cclass().description(),
                    class_size: self.cclass().class_size(),
                    enrollment_end_date: Date.parse(self.cclass().enrollment_end_date()).toString('dd MMM yyyy'),
                    city: self.cclass().city(),
                    state: self.cclass().state()[0],
                    key_event: self.cclass().key_event()!=true?'No':'Yes',
                    status: self.cclass().status()[0],
                    schedules: self.cclass().schedules()
                });
                $("#addclasstoclass").ojDialog("close");
                $(".classlist").empty();
                updateCourseClass();
                //resetClass();
                editor_instance_data1 = "";

            }

            saveClassTotheCourse = function () {
                if (self.cclass().schedules().length < 1) {
                    self.showToastDialog("Atleast create one schedule for the class", 0);
                    return;
                }

                if (self.cclass().class_size().length < 1) {
                    self.showToastDialog("Please enter valid class size.", 0);
                    return;
                }

                if (self.cclass().city().length < 1) {
                    self.showToastDialog("Please enter valid City.", 0);
                    return;
                }
                if(editor_instance_data4.length==0){
                    self.showToastDialog("Please enter some description.",0);
                    return;
                }

                if(!isUnderCharacterLimit(editor_instance_data4)){
                    return;
                }

                self.cclass().enrollment_end_date(self.cclass().enrollment_end_date().length > 0 ? Date.parse(self.cclass().enrollment_end_date()).toString('dd MMM yyyy') : self.cclass().enrollment_end_date_view());

                self.cclass().key_event(self.cclass().key_event()?'Yes':'No');
                self.cclass().description(editor_instance_data4);

                var classlist = new Array();
                classlist.push(self.cclass());

                var reqbody = {
                    classes: classlist
                }
                console.log(ko.toJSON(reqbody));


                var url = trainingbaseurl + "editClasses";
                $.ajax({
                    url: url,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(reqbody),
                    success: function (data) {
                        
                        console.log("Class Successfully Updated : " + ko.toJSON(data));
                        $("#editclass").ojDialog("close");
                        resetClass();
                        self.fetchcourses();
                        $("#edittraining").ojDialog("close");
                        fetchkeydates();
                        self.showToastDialog("Class Successfully Updated",2000);
                    }
                }).fail(function (xhr, textStatus, err) {
                    self.showToastDialog("Class Failed Updated", 0);
                });
                editor_instance_data4 = "";

            }


            requesttraining = function () 
            {
                // self.rtrselected(self.rtrsel()[0].name);
                // self.rtrcatselected(self.refinesel()[0].name);

                if(self.refinesel().length==0){
                    self.showToastDialog("Please select a Category.",0);
                    return;
                }

                if(self.rtrsel().length==0){
                    self.showToastDialog("Please select a Role.",0);
                    return;
                }
                var rtr = {
                    category: self.refinesel()[0],
                    name: ssoemail,
                    role: self.rtrsel()[0]
                }
                console.log(ko.toJSON(rtr));
                $.ajax({
                    url: com_call_api+'RequestTraining',
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(rtr),
                    success: function (rtrdata) {
                        self.showToastDialog("Training requested", 2000);
                        $("#trainingDialog").ojDialog("close");
                    }
                }).fail(function (xhr, textStatus, err) {
                    alert(err);
                });
            }

            deleteClass = function () {
                var classidtodel = self.createCourse().classes()[0].class_id;


                var classobj = new Array();
                classobj.push(classidtodel);

                var body = {
                    classes: classobj
                }

                console.log(">>>  " + ko.toJSON(body));

                var url = trainingbaseurl + "dropClasses";
                $.ajax({
                    url: url,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(body),
                    success: function (data) {
                        
                        console.log("Class Successfully Deleted");
                        $("#editclass").ojDialog("close");
                        resetClass();
                        self.fetchcourses();
                        $("#edittraining").ojDialog("close");
                        self.showToastDialog("Class Successfully Deleted",2000);
                    }
                }).fail(function (xhr, textStatus, err) {
                    // alert(err);
                    self.showToastDialog("Class updation failed", 0);
                });
            }


            saveCourse = function () {
                if(editor_instance_data3.length==0){
                    self.showToastDialog("Please enter some description.",0);
                    return;
                }

                if(!isUnderCharacterLimit(editor_instance_data3)){
                    return;
                }

                console.log("saving course . . .: "+ko.toJSON(self.selectedCategoriesForCourse()));
                var mappedCategories = new Array();
                self.selectedCategoriesForCourse().forEach(function (element) {
                    if(!mappedCategories.includes(element.category_id)){
                        mappedCategories.push(element.category_id);
                    }
                });
                self.cclass().status(self.cclass().status()[0]);
                self.cclass().state(self.cclass().state()[0]);
                var coursedata = {
                    course_id: self.createCourse().course_id(),
                    name: self.createCourse().name(),
                    description: editor_instance_data3,//$('#edit_course_editor').val(),//self.createCourse().description(),
                    cloud_onpremise: self.createCourse().cloud_onpremise()[0],
                    training_level: self.createCourse().training_level()[0],
                    training_type: self.createCourse().training_type()[0],
                    status: self.createCourse().status()[0],
                    contact_email: self.createCourse().contact_email(),
                    categories: mappedCategories,
                    classes: self.createCourse().classes()
                }
                var courses = new Array();
                courses.push(coursedata);

                var reqBody = {
                    courses: courses
                }
                console.log(ko.toJSON(reqBody));

                var url = trainingbaseurl + "editCourses";
                $.ajax({
                    url: url,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(reqBody),
                    success: function (data) {
                        console.log("Course Successfully Updated");
                        self.fetchcourses();
                        $("#edittraining").ojDialog("close");
                        resetCourse();
                        self.showToastDialog("Course Successfully Updated", 2000);
                       
                    }
                }).fail(function (xhr, textStatus, err) {
                    // alert(err);
                    self.showToastDialog("Update Failed!", 0);
                    self.fetchcourses();
                });
                editor_instance_data3 = ""
            }


            editClass = function (class_to_edit) {
               if (CKEDITOR.instances.edit_class_editor) {
                    CKEDITOR.instances.edit_class_editor.destroy(true); 
                } 
                // resetClass();
                console.log(Date.parse(class_to_edit.enrollment_end_date).toString('dd MMM yyyy'));
                self.cclass().class_id(class_to_edit.class_id);
                //self.cclass().description(class_to_edit.description);
                //$('#edit_class_editor').froalaEditor('html.set', class_to_edit.description);
                editor_instance_data4 = class_to_edit.description;
                self.cclass().class_size(class_to_edit.class_size);
                self.cclass().enrollment_end_date();
                self.cclass().enrollment_end_date_view(Date.parse(class_to_edit.enrollment_end_date).toString('dd MMM yyyy'));
                self.cclass().city(class_to_edit.city);
                self.cclass().state(class_to_edit.state);
                self.cclass().status(class_to_edit.status);
                self.cclass().key_event(class_to_edit.key_event == 'Yes' ? true : false);
                self.cclass().schedules(class_to_edit.schedules);
                showScheduleBlock();
                $("#editclass").ojDialog("open");
            }

            updateCourseClass = function () {

                var htmlData = "<ul>";
                $(".classlist").empty();
                var classList = self.createCourse().classes();

                for (var i = 0; i < classList.length; i++) {

                    htmlData += "<li>";
                    htmlData += "<i class=\"fa fa-trash-o\" style=\"cursor: pointer;float: right;margin-left: 5px\" title=\"Delete Course\" onclick=\"deleteClass()\" target=\"_blank\"></i><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\" style=\"cursor: pointer;float: right;margin-left: 5px\" title=\"Edit Course\" onclick=\'editClass(" + JSON.stringify(classList[i]) + ")\' target=\"_blank\"></i>";
                    htmlData += "<p>City: " + classList[i].city + "</p>";
                    htmlData += "<P> Strength: " + classList[i].class_size + "</P>";
                    htmlData += "<P> Enroll By: " + Date.parse(classList[i].enrollment_end_date).toString('dd MMM yyyy') + "</P>";
                    htmlData += "</li>"
                }
                htmlData += "</ul>";
                $(".classlist").append(htmlData);
            }


            // EDIT EXISTING COURSE FOR TRAINING
            edittraining = function (course) {
               if (CKEDITOR.instances.edit_course_editor) {
                    CKEDITOR.instances.edit_course_editor.destroy(true); 
                } 
                var courseid = course.course_id;

                var courseToEdit = findCourseById(courseid);
                resetCourse();

                if (courseToEdit != undefined) {

                    console.log(ko.toJSON(courseToEdit));
                    self.createCourse().course_id(courseToEdit.course_id);
                    self.createCourse().name(courseToEdit.name);
                    //self.createCourse().description(courseToEdit.description);
                    //$('#edit_course_editor').froalaEditor('html.set', courseToEdit.description);
                    editor_instance_data3 = courseToEdit.description;
                    self.createCourse().contact_email(courseToEdit.contact);
                    self.createCourse().cloud_onpremise().push(courseToEdit.prodcut_type);
                    self.createCourse().training_level().push(courseToEdit.training_level);
                    self.createCourse().training_type().push(courseToEdit.training_type);
                    self.createCourse().status().push(courseToEdit.status);
                    self.createCourse().classes(courseToEdit.classes);
                    self.createCourse().categories(courseToEdit.categories);
                    self.createCourse().categories_all(courseToEdit.categories_all);

                    // self.cclass(courseToEdit.classes);
                    // RENDER MAPPED CATEGORY FOR THE COURSE
                    renderCourseCategory();

                    // RENDER CLASSES FOR THE COURSE
                    renderCourseClasses()

                    // SHOW THE EDIT WINDOW ONCE THE FORM IS POPULATED
                    $("#edittraining").ojDialog("open");
                }
            }

            renderCourseCategory = function () {

                self.selectedCategoriesForUi([]);
                for (var i = 0; i < self.createCourse().categories_all().length; i++) {
                    self.selectedCategoriesForUi.push(self.createCourse().categories_all()[i].name);
                    self.selectedCategoriesForCourse().push(self.createCourse().categories_all()[i]);

                }

            }

            renderCourseClasses = function () {
                updateCourseClass();
            }



            //  DELETE A COURSE POST CONFIRMATION
            deletecourse = function (coursedata) {
                if (confirm("Do you really wish to delete the course?")) {

                    var course = new Array();
                    course.push(coursedata.course_id);

                    var body = {
                        courses: course
                    }
                    console.log("Deleting courses. . . " + ko.toJSON(body));
                    var url = trainingbaseurl + "dropCourses";
                    $.ajax({
                        url: url,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: ko.toJSON(body),
                        success: function (data) {
                            self.showToastDialog("Course Successfully deleted", 2000);
                            self.fetchcourses();
                        }
                    }).fail(function (xhr, textStatus, err) {
                        // alert(err);
                        self.showToastDialog("Course Deletion Failed!", 0);
                    });

                }

            }

            getCategoryHierarchy();
            // $("#tree").on("ojoptionchange", function(e, ui) 
            // {
            //     if (ui.option == "selection") 
            //     {
            //         // show selected nodes
            //         var selected = _arrayToStr(ui.value) ;
            //         $("#results").html("<label> id = " + selected + "</label>");
            //     }
            // });
            // function _arrayToStr(arr)
            // {
            //     var s = "" ;
            //     $.each(arr, function(i, val)
            //     {
            //         if (i) {s += ", " ;}
            //         console.log(val)
            //         s += $(arr[i]).attr("id") ;
            //     }) ;
            //     return s ;
            // };

            categoryfamily = function (e, ui) 
            {
                // return ui.value[0].innerText;
                // if(ui.value[0].innerText!= undefined)
                // {
                //     console.log(ui.value[0].innerText);
                //     self.rtrcategory(ui.value[0].innerText);
                // }
            }

            self.adminviewSelected=function(){
                self.fetchcourses();
            }


            self.searchcontent=function(elem,data){
                
                if(self.switchadminview()){
                    console.log("typing . . .");
                    filtercourse(data.value);
                }
            }


            filtercourse=function(value){

                // Store the courses in a temp variable
                var temcourses=new Array();
                for(var i=0;i<self.courselist.length;i++){
                    var course=self.courselist[i];
                    if(course!=undefined &&course.name!=undefined && course.name.toLowerCase().includes(value.toLowerCase())){
                        temcourses.push(course);
                    }
                }
                self.processCoursesFromService(temcourses);

            }

            reseteventreportfilter=function(){
                setuncheck('reporttype');
                setuncheck('reportdays');
                setuncheck('reportkeyevent');
                self.event_report_type([]);
                self.event_report_no_days([]);
                self.event_report_key_event('');
                self.searcheventreportstext([]);
                loadEventReportData();
            }

            /******************************************ANALYTICS TRAINING*********************************************************************************/

            analytics = function (itemtitle, itemname, itemtype, itemlevel1, itemlevel2, itemlevel3) 
            {
                var itemdesc;
                if (ssoemail == "") {
                    ssoemail = "test@oracle.com";
                }
                if (itemlevel2 == "Events") {
                    if (itemtitle != "" && itemname != "") {
                        itemdesc = itemtitle + " at " + itemname;
                    }
                    else if (itemtitle == "" && itemname != "") {
                        itemdesc = itemname;
                    }
                    else if (itemtitle != "" && itemname == "") {
                        itemdesc = itemtitle;
                    }
                    else {
                        itemdesc = "";
                    }
                }
                else if (itemlevel2 == "Community Calls") {
                    if (itemtitle != "" && itemname != "") {
                        itemdesc = itemtitle + " with call_id " + itemname;
                    }
                    else if (itemtitle == "" && itemname != "") {
                        itemdesc = itemname;
                    }
                    else if (itemtitle != "" && itemname == "") {
                        itemdesc = itemtitle;
                    }
                    else {
                        itemdesc = "";
                    }
                }
                else {
                    if (itemtitle != "" && itemname != "") {
                        itemdesc = itemtitle + " from category : " + itemname;
                    }
                    else if (itemtitle == "" && itemname != "") {
                        itemdesc = itemname;
                    }
                    else if (itemtitle != "" && itemname == "") {
                        itemdesc = itemtitle;
                    }
                    else {
                        itemdesc = "";
                    }
                }
                if (itemlevel3 == "") {
                    var analytics = {
                        "session_id": sessionid,
                        "email": ssoemail,
                        "event_description": itemdesc,
                        "event_type": itemtype,
                        "level_1": itemlevel1,
                        "level_2": itemlevel2
                    };
                }
                else {
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
                $.ajax({
                    url: homebaseurl + 'POST_EVENT_DATA',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(analytics),
                    success: function (event) {
                        console.log("Analytics of event sent.", event);
                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log("Error in sending analytics", err);
                });
                return true;
            }
        /******************************************ANALYTICS TRAINING ENDS***************************************************************************/
            
        }
        return new DashboardViewModel();
    }
);
