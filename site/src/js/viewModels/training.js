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
            self.calltitle = ko.observable('');
            self.callspkr = ko.observable('');
            self.calldesignation = ko.observable('');
            self.date = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.starttime = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.callduration = ko.observable('');
            self.callsdate = ko.observable('');
            self.calltime = ko.observable('');
            self.callvenue = ko.observable('');
            self.calllink = ko.observable('');
            self.calldialin = ko.observable('');
            self.calldesc = ko.observable('');
            self.reflink = ko.observable('');
            self.callrecordinglink = ko.observable('');
            self.callroles = ko.observable('');
            self.callmode = ko.observable('');
            self.communityCallList = ko.observableArray([]);
            self.organizerEmail = ko.observable('');
            self.topic = ko.observable('');
            self.invite = ko.observable('');

            self.courselist = ko.observableArray([]);
            self.reporteelist = ko.observableArray([]);


            // REPORTEE
            self.selectreportees = ko.observableArray([]);

            self.selectedcourseid = "";
            self.selectedclassid = "";

            // TOAST MESSAGE DIALOG
            self.title = ko.observable("");
            self.msg = ko.observable("");


            // CREATE COURSE VARIABLES
            self.course_name = ko.observable('');
            self.course_description = ko.observable('');
            self.categoryForUi = ko.observableArray([]);


            //REQUEST TRAINING VARIABLES
            self.rtrcategory = ko.observable('');
            self.rtrname = ko.observable('');

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
                classes: ko.observableArray([])
            });


            self.rolelist = ko.observableArray([]);


            // EVENT HANDLER FOR ROLE SELECTION
            rolesselected = function (event, ui) {
                populateCategory(ui.value);
            }

            //EVENT HANDLE FOR CATEGORY SELECTION
            categorySelected = function (event, ui) {
                populateSubcategory(ui.value);
            }

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
                $.getJSON("https://apex.oraclecorp.com/pls/apex/se_cloud_ready_training/training/getFiltersV2").
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
            this.patternValue = ko.observableArray(["dd-MMM-yy hh:mm"]);
            this.dateTimeConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
            createConverter({
                pattern: "dd-MMM-yy hh:mm"
            });
            self.callname = ko.observable('');
            self.callspkr = ko.observable('');
            self.calldesignation = ko.observable('');
            self.starttime = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.callduration = ko.observable('');
            self.date = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.callsdate = ko.observable('');
            self.calltime = ko.observable('');
            self.callvenue = ko.observable('');
            self.calllink = ko.observable('');
            self.calldialin = ko.observable('');
            self.calldesc = ko.observable('');
            self.callrecordlink = ko.observable('');
            self.selectedrole = ko.observableArray([]);
            self.selectedcallmode = ko.observableArray([]);
            self.callmodes = ko.observableArray(['Virtual', 'Town Hall']);
            self.addiontal_link = ko.observable('');
            self.organizerEmail = ko.observable('');
            self.topic = ko.observable('');
            self.invite = ko.observable('');
            self.com_call_keyevent = ko.observable('');

            resetcall = function () {
                self.callname('');
                self.callspkr('');
                self.calldesignation('');
                self.starttime(oj.IntlConverterUtils.dateToLocalIso(new Date()));
                self.callduration('');
                self.date(oj.IntlConverterUtils.dateToLocalIso(new Date()));
                self.callsdate('');
                self.calltime('');
                self.callvenue('');
                self.calllink('');
                self.calldialin('');
                self.calldesc('');
                self.reflink('');
                self.callrecordlink('');
                self.selectedrole([]);
                self.organizerEmail('');
                self.topic('');
                self.invite('');
                self.addiontal_link('');
                self.com_call_keyevent(false);

            }




            // showToastDialog("","");


            // CREATE COMMUNITY CALL
            createcommunitycall = function () {
                var selectedrole = '';
                var selectedcallmode = '';

                if (self.callname().length == 0) {
                    alert("Please enter Community call name");
                    return;
                }

                if (self.callspkr().length == 0) {
                    alert("Please enter name of the speaker");
                    return;
                }


                if (self.calldesc().length == 0) {

                    alert("Please enter description");
                    return;
                }
                if (self.calldesc().length == 0) {

                    alert("Select atleast one role");
                    return;
                }

                if (self.callduration().length == 0) {

                    alert("Please enter duration");
                    return;
                } else if (typeof self.callduration() == 'number') {
                    alert("Please enter valid duration in minute(s)");
                    return;
                }

                if (self.selectedrole().length == 0) {
                    alert("Please select role");
                }

                if (self.selectedcallmode().length == 0) {
                    alert("Please select mode of delivary");
                }
                selectedrole = ko.toJSON(self.selectedrole()).replace('[', '').replace(']', '').replace(/"/g, '');
                selectedcallmode = ko.toJSON(self.selectedcallmode()).replace('[', '').replace(']', '').replace(/"/g, '');

                var call = {
                    name: self.callname(),
                    speaker: self.callspkr(),
                    designation: self.calldesignation(),
                    call_date: self.date().split('T')[0],
                    call_time: self.starttime().split('T')[1].substring(0, 5),
                    duration: self.callduration(),
                    locn: self.callvenue(),
                    meetinglink: self.calllink(),
                    dialin: self.calldialin(),
                    description: self.calldesc(),
                    reflink: self.reflink(),
                    user: ssoemail,
                    recording_link: self.callrecordlink(),
                    mode_of_call: selectedcallmode,
                    role: selectedrole,
                    addl_link: self.addiontal_link(),
                    organizer_email: self.organizerEmail(),
                    topic: self.topic(),
                    invite: self.invite(),
                    keyevent: self.com_call_keyevent()!=true?'No':'Yes' 

                }
                console.log(ko.toJSON(call));

                $.ajax({
                    url: community_call_url,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(call),
                    success: function (data) {
                        resetcall();
                        loadCommunitycall();

                    }
                }).fail(function (xhr, textStatus, err) {
                    // alert(err);
                });
                $("#createcommunitycall_id").ojDialog("close");

            }

            //----------------------- END OF COMMUNITY CALL  ---------------------//
            openCommunityCallDialog = function () {
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

            self.handleAttached = function (info) {
                // Implement if needed
            };

            self.closeRole = function () {
                $("#modalDialog1").ojDialog("close")
            };

            //EVENT HANDLE FOR CATEGORY SELECTION
            categorySelected = function (event, ui) {
                populateSubcategory(ui.value);
            }
            self.openReqtraining = function () {
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
                    console.log(course.course_id);
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
                $("#coursedetails").ojDialog("open");



            }


            searchcourses = function () {
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
                        email: ssoemail
                    },
                    success: function (allcourses) {
                        self.courselist = allcourses.courses;
                        self.processCoursesFromService(allcourses);
                        self.getCourseIdFromUrl();
                        

                    },
                    error: function (xhr) {
                        // alert(xhr);
                    }
                });
            }
            self.fetchcourses();

            self.resetCourseFilters = function () {
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
                            self.processCoursesFromService(allcourses);
                            self.getCourseIdFromUrl();
                        },
                        error: function (xhr) {
                            alert(xhr);
                        }
                    });
                }
            }

            self.refinecourses = function () {
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
                    role_id: selectedroles
                }
                $.ajax({
                    url: trainingbaseurl + "getCoursesV2",
                    method: 'GET',
                    headers: headerobj,
                    success: function (allcourses) {
                        self.processCoursesFromService(allcourses);
                    },
                    error: function (xhr) {
                        // alert(xhr);
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
                for (var k = 0; k < allcourses.courses.length; k++) {
                    startday = ''; //allcourses.courses[k].schedule[0];
                    var curcourse = allcourses.courses[k];
                    var catagorylist = curcourse.categories;
                    var catlistString = ko.toJSON(self.refinecategories());
                    var enrolled = "";
                    if (curcourse.classes.length > 0) {
                        var classCount = curcourse.classes.length;
                        for (var i = 0; i < classCount; i++) {
                            if (curcourse.classes[i].enrollment_status != "Not Enrolled") {
                                enrolled = curcourse.classes[i].enrollment_status;
                                break;
                            }
                        }
                    }

                    for (var i = 0; i < catagorylist.length; i++) {
                        var categoryname = catagorylist[i].name;
                        var catid = catagorylist[i].id;
                        if (catlistString.length == 2 || catlistString.indexOf(catid) != -1) {
                            var categoryobj = self.getcategorybyname(categoryname);
                            categoryobj.courses.push({
                                name: curcourse.name,
                                description: curcourse.description,
                                subdescription: curcourse.description.substring(0, 120) + '...',
                                class_size: curcourse.class_size,
                                prodcut_type: curcourse.prodcut_type,
                                training_level: curcourse.training_level,
                                training_type: curcourse.training_type,
                                category_name: curcourse.category_name,
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
                // Implement if needed
            };


            self.handleDetached = function (info) {
                // Implement if needed
            };


            /*----------------------------------SEARCH----------------------------------*/
            self.currentValue = ko.observableArray();
            self.currentRawValue = ko.observable();
            self.buttonDisabled = ko.observable(true);
            self.searchInput = function () {};


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
                var index_of = call_id_val1.indexOf("com_call_id");
                var call_id_data1 = call_id_val1.substr(index_of+12);
                if (call_id_data1*1 == call_id_data1){
                    $('#com_call_tab').trigger('click');
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
                        self.communityCallList.push({
                            name: calls[i].name != undefined ? calls[i].name : '',
                            speaker: calls[i].speaker != undefined ? calls[i].speaker : '',
                            designation: calls[i].designation != undefined ? calls[i].designation : '',
                            call_date: calls[i].call_date != undefined ? calls[i].call_date.split('T')[0] : '',
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
                            /*invite: calls[i].invite != undefined ? calls[i].invite : '',*/
                            invite: calls[i].call_id != undefined ? community_call_calendar_link+"/"+calls[i].call_id : '',
                            call_id: calls[i].call_id != undefined ? calls[i].call_id : '',
                            key_event_value: calls[i].keyevent != 'No' ? true : false
                        });

                    }
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
                self.ccName('');
                self.ccDate('');
                self.ccSpeaker('');
                self.ccDesignation('');
                self.ccCallType('');
                self.ccMeetingLink('');
                self.ccRoles('');
                self.ccDescription('');
                self.ccDialin('');
                self.ccAdditionalLinks('');
                self.ccRecordingLinks('');
                self.ccOrganizerEmail('');
                self.ccTopic('');
                self.ccInvite('');

                // SET NEW VALUE
                self.ccName(ccalls.name);
                self.ccDate(ccalls.call_date);
                self.ccSpeaker(ccalls.speaker);
                self.ccDesignation(ccalls.designation);
                self.ccCallType(ccalls.mode_of_call);
                self.ccMeetingLink(ccalls.meetinglink);
                self.ccRoles(ccalls.role);
                self.ccDescription(ccalls.subdescription);
                self.ccDialin(ccalls.dialin);
                self.ccAdditionalLinks(ccalls.addl_link);
                self.ccRecordingLinks(ccalls.recording_link);
                self.ccOrganizerEmail(ccalls.organizer_email);
                self.ccTopic(ccalls.topic);
                self.ccInvite(ccalls.invite);
                self.ccId(ccalls.call_id);
                $("#communitycallsdetails").ojDialog("open");
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
            self.editccDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.editccTime = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
            self.editccDuration = ko.observable();
            self.editccVenue = ko.observable();
            self.editccSpeaker = ko.observable();
            self.editccDesignation = ko.observable();
            self.editccCallType = ko.observableArray([]);
            self.editccMeetingLink = ko.observable();
            self.editccSelectedRoles = ko.observableArray([]);
            self.editccDescription = ko.observable();
            self.editccDialin = ko.observable();
            self.editccAdditionalLinks = ko.observable();
            self.editccRecordingLinks = ko.observable();

            self.editccOrganizerEmail = ko.observable();
            self.editccTopic = ko.observable();
            self.editccInvite = ko.observable();
            self.edit_com_call_keyevent = ko.observable('');

            var edit_call_id;
            editcommunitycall = function (edit_calls, param2) {

                self.editccName('');
                self.editccDate('');
                self.editccTime('');
                self.editccDuration('');
                self.editccVenue('');
                self.editccSpeaker('');
                self.editccDesignation('');
                self.editccCallType([]);
                self.editccMeetingLink('');
                self.editccSelectedRoles([])
                self.editccDescription('');
                self.editccDialin('');
                self.editccAdditionalLinks('');
                self.editccRecordingLinks('');

                self.editccOrganizerEmail('');
                self.editccTopic('');
                self.editccInvite('');
                self.edit_com_call_keyevent('');

                // SET NEW VALUE
                self.editccName(edit_calls.name);
                self.editccDate(edit_calls.call_date);
                timeString = edit_calls.call_time.substring(0, 5);
                timeFormattedString = "T" + timeString + ":00";
                self.editccTime(timeFormattedString);
                self.editccDuration(edit_calls.callduration);
                self.editccVenue(edit_calls.location);
                self.editccSpeaker(edit_calls.speaker);
                self.editccDesignation(edit_calls.designation);
                self.editccAdditionalLinks(edit_calls.addl_link);
                var callTypeString = edit_calls.mode_of_call;
                var callTypeArray = callTypeString.split(",");
                self.editccCallType(callTypeArray);
                self.editccMeetingLink(edit_calls.meetinglink);
                var roleString = edit_calls.role;
                var roleArray = [];
                roleArray = roleString.split(",");
                self.editccSelectedRoles(roleArray)
                self.editccDescription(edit_calls.subdescription);
                self.editccDialin(edit_calls.dialin);
                self.editccRecordingLinks(edit_calls.recording_link);

                self.editccOrganizerEmail(edit_calls.organizer_email);
                self.editccTopic(edit_calls.topic);
                self.editccInvite(edit_calls.invite);
                edit_call_id = edit_calls.call_id;

                self.edit_com_call_keyevent(edit_calls.key_event_value);
                $("#editcommunitycall_id").ojDialog("open");
            }



            editCommunityCallValues = function () {
                editSelectedRole = ko.toJSON(self.editccSelectedRoles()).replace('[', '').replace(']', '').replace(/"/g, '');
                editSelectedCallMode = ko.toJSON(self.editccCallType()).replace('[', '').replace(']', '').replace(/"/g, '');

                var edit_community_call_data = {
                    NAME: self.editccName(),
                    speaker: self.editccSpeaker(),
                    designation: self.editccDesignation(),
                    call_date: self.editccDate(),
                    call_time: self.editccTime().substring(1, 6),
                    duration: self.editccDuration().substring(0, 2),
                    locn: self.editccVenue(),
                    meetinglink: self.editccMeetingLink(),
                    dialin: self.editccDialin(),
                    description: self.editccDescription(),
                    user: ssoemail,
                    recording_link: self.editccRecordingLinks(),
                    mode_of_call: editSelectedCallMode,
                    role: editSelectedRole,
                    addl_link: self.editccAdditionalLinks(),
                    organizer_email: self.editccOrganizerEmail(),
                    topic: self.editccTopic(),
                    invite: self.editccInvite(),
                    call_id: edit_call_id,
                    keyevent: self.edit_com_call_keyevent()!=true?'No':'Yes'

                }
                console.log("edit : " + ko.toJSON(edit_community_call_data));
                $.ajax({
                    url: community_call_url,
                    cache: false,
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(edit_community_call_data),
                    success: function (data) {
                        console.log("edit success");
                        loadCommunitycall();

                    },
                    fail: function (xhr, textStatus, err) {
                        console.log("failed" + err);
                    },
                    error: function (xhr, textStatus, err) {
                        console.log("error" + err);
                    }
                });
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

                self.cloneccName('');
                self.cloneccDate('');
                self.cloneccTime('');
                self.cloneccDuration('');
                self.cloneccVenue('');
                self.cloneccSpeaker('');
                self.cloneccDesignation('');
                self.cloneccCallType([]);
                self.cloneccMeetingLink('');
                self.cloneccSelectedRoles([])
                self.cloneccDescription('');
                self.cloneccDialin('');
                self.cloneccAdditionalLinks('');
                self.cloneccRecordingLinks('');

                self.cloneccOrganizerEmail('');
                self.cloneccTopic('');
                self.cloneccInvite('');
                self.clone_com_call_keyevent('');

                // SET NEW VALUE
                self.cloneccName(clone_calls.name);
                self.cloneccDate(clone_calls.call_date);
                var timeString = clone_calls.call_time.substring(0, 5);
                var timeFormattedString = "T" + timeString + ":00";
                self.cloneccTime(timeFormattedString);
                self.cloneccDuration(clone_calls.callduration);
                self.cloneccVenue(clone_calls.location);
                self.cloneccSpeaker(clone_calls.speaker);
                self.cloneccDesignation(clone_calls.designation);
                self.cloneccAdditionalLinks(clone_calls.addl_link);
                var callTypeString = clone_calls.mode_of_call;
                var callTypeArray = callTypeString.split(",");
                self.cloneccCallType(callTypeArray);
                self.cloneccMeetingLink(clone_calls.meetinglink);
                var roleString = clone_calls.role;
                var roleArray = [];
                roleArray = roleString.split(",");
                self.cloneccSelectedRoles(roleArray)
                self.cloneccDescription(clone_calls.subdescription);
                self.cloneccDialin(clone_calls.dialin);
                self.cloneccRecordingLinks(clone_calls.recording_link);

                self.cloneccOrganizerEmail(clone_calls.organizer_email);
                self.cloneccTopic(clone_calls.topic);
                self.cloneccInvite(clone_calls.invite);
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

                if (self.cloneccSpeaker().length == 0) {
                    alert("Please enter name of the speaker");
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
                } else if (typeof self.cloneccDuration() == 'number') {
                    alert("Please enter valid duration in minute(s)");
                    return;
                }

                if (self.cloneccCallType().length == 0) {
                    alert("Please select mode of delivary");
                }
                cloneSelectedrole = ko.toJSON(self.cloneccSelectedRoles()).replace('[', '').replace(']', '').replace(/"/g, '');
                cloneSelectedcallmode = ko.toJSON(self.cloneccCallType()).replace('[', '').replace(']', '').replace(/"/g, '');

                var clone_call = {
                    name: self.cloneccName(),
                    speaker: self.cloneccSpeaker(),
                    designation: self.cloneccDesignation(),
                    call_date: self.cloneccDate(),
                    call_time: self.cloneccTime().split('T')[1].substring(0, 5),
                    duration: self.cloneccDuration().substring(0, 2),
                    locn: self.cloneccVenue(),
                    meetinglink: self.cloneccMeetingLink(),
                    dialin: self.cloneccDialin(),
                    description: self.cloneccDescription(),
                    addl_link: self.cloneccAdditionalLinks(),
                    user: ssoemail,
                    recording_link: self.cloneccRecordingLinks(),
                    mode_of_call: cloneSelectedcallmode,
                    role: cloneSelectedrole,
                    organizer_email: self.cloneccOrganizerEmail(),
                    topic: self.cloneccTopic(),
                    invite: self.cloneccInvite(),
                    keyevent: self.clone_com_call_keyevent()!=true?'No':'Yes'


                }

                console.log("clone json data: " + ko.toJSON(clone_call));

                $.ajax({
                    url: community_call_url,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(clone_call),
                    success: function (data) {
                        loadCommunitycall();
                        console.log("success")

                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log("error during clone" + err);
                });
                $("#clonecommunitycall_id").ojDialog("close");

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
                if (call_id_data*1 != call_id_data){
                    call_id_data = '$-$';
                }
                var apex_link = 'GetCommunityCallDetailsOnFreetextSearch/' + searchtext + '/' + past + '/' + callmodel + '/' + roles + '/' +call_id_data;
                getCommunityCalls(apex_link);
                
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
                            if (data.directs.length > 0) {
                                getEmployeeFromReportees(data.directs);
                            }

                        },
                        error: function (xhr) {
                            // alert(xhr);
                        }
                    });

                }
            }

            //  CONVERTING HIERARCHICAL ORAGINAZATION DATA TO LINEAR LIST OF EMPLOYEES
            function getEmployeeFromReportees(data) {
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
                    console.log(ko.toJSON(enrollment));
                    $.ajax({
                        url: enrollurl,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: ko.toJSON(enrollment),
                        success: function (data) {
                            console.log(ko.toJSON(data));
                            if (self.searchtext().length == 0) {
                                self.fetchcourses();
                            } else {
                                self.searchfetchcourses();
                            }
                            self.showToastDialog("Successfully Enrolled.", true, 2000);
                            $("#reportees").ojDialog("close");
                        }
                    }).fail(function (xhr, textStatus, err) {
                        self.showToastDialog("Enrollment Failed.", true, 2000);
                        console.log(ko.toJSON(err));
                    });
                }

            }

            self.showToastDialog = function (msg, autoclose, timeinmillisec) {
                self.msg(msg);
                $("#toastdiv").ojDialog("open");
                if (autoclose) {
                    setTimeout(function () {
                        $("#toastdiv").ojDialog("close");
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

                        self.showToastDialog("Please login to enroll", false, 2000);
                    }
                }
            }
            sendErollmentRequest = function () {
                enrollforCourse(self.selectreportees());
            }

            self.openCreatetraining = function () {
                resetCourse();
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
                self.cclass().state('');
                self.cclass().status('');
                self.cclass().key_event(false);
                resetSchedule();
                $(".classlist").empty();
            }

            resetSchedule = function () {
                self.csdate('');
                self.cedate('');
                self.ctimezone([]);
                $(".addedschedule").empty();
            }

            // REQUEST COURSE CREATION BASED ON SAVED DATA
            self.createcourse = function () {
                console.log("Creating course . . .");
                var mappedCategories = new Array();
                self.selectedCategoriesForCourse().forEach(function (element) {
                    mappedCategories.push(element.id);
                });

                var coursedata = {
                    name: self.createCourse().name(),
                    description: self.createCourse().description(),
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

                var url = trainingbaseurl + "createCourses";
                $.ajax({
                    url: url,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(reqBody),
                    success: function (data) {
                        self.showToastDialog("Course Successfully Created", true, 1000);
                        console.log("Course Successfully Created");
                        $("#createcoursedialog").ojDialog("close");
                        resetCourse();
                        console.log(ko.toJSON(data));

                    }
                }).fail(function (xhr, textStatus, err) {
                    // alert(err);
                    self.showToastDialog("Course Creation Failed!", true, 2000);
                });

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
                        id: ui.value[0].id,
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

            openaddsclasswindow = function () {
                resetClass();
                $("#addclasstoclass").ojDialog("open");
            }

            addScheduleBlock = function () {
                $('#schedule').append($('#scheduleblock'));
                $('#scheduleblock').show();
            }

            resetSchedule = function () {
                self.schedule().start_date('');
                self.schedule().end_date('');
                self.schedule().timezone([]);
            }

            addschedule = function () {
                console.log(ko.toJSON(self.csdate()));
                console.log(ko.toJSON(self.cedate()));
                console.log(ko.toJSON(self.ctimezone()));

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
                resetSchedule();
            }

            deleteSchedule = function (index) {
                self.cclass().schedules().splice(index, 1);
                showScheduleBlock();
                console.log(ko.toJSON(self.cclass()));
            }

            addClassTotheCourse = function () {
                if (self.cclass().schedules().length < 1) {
                    self.showToastDialog("Atleast create one schedule for the class", false, 0);
                    return;
                }

                if (self.cclass().class_size().length < 1) {
                    self.showToastDialog("Please enter valid class size.", false, 0);
                    return;
                }

                if (self.cclass().city().length < 1) {
                    self.showToastDialog("Please enter valid City.", false, 0);
                    return;
                }


                self.createCourse().classes().push({
                    description: self.cclass().description(),
                    class_size: self.cclass().class_size(),
                    enrollment_end_date: Date.parse(self.cclass().enrollment_end_date()).toString('dd MMM yyyy'),
                    city: self.cclass().city(),
                    state: self.cclass().state(),
                    key_event: self.cclass().key_event()!=true?'No':'Yes',
                    status: self.cclass().status()[0],
                    schedules: self.cclass().schedules()
                });
                $("#addclasstoclass").ojDialog("close");
                updateCourseClass();
                //resetClass();

            }

            saveClassTotheCourse = function () {
                if (self.cclass().schedules().length < 1) {
                    self.showToastDialog("Atleast create one schedule for the class", false, 0);
                    return;
                }

                if (self.cclass().class_size().length < 1) {
                    self.showToastDialog("Please enter valid class size.", false, 0);
                    return;
                }

                if (self.cclass().city().length < 1) {
                    self.showToastDialog("Please enter valid City.", false, 0);
                    return;
                }

                self.cclass().enrollment_end_date(self.cclass().enrollment_end_date().length > 0 ? Date.parse(self.cclass().enrollment_end_date()).toString('dd MMM yyyy') : self.cclass().enrollment_end_date_view());

                self.cclass().key_event(self.cclass().key_event()?'Yes':'No');
                var classlist = new Array();
                classlist.push(self.cclass());

                var reqbody = {
                    classes: classlist
                }
                console.log(ko.toJSON(reqbody));

                requesttraining = function () 
                {
                    var rtr = {
                      category: self.rtrcategory(),
                      name: "Aditya Sharma",
                      role: self.rolelist()[0].name
                    }
                    console.log(ko.toJSON(rtr));
                    $.ajax({
                      url: 'https://apex.oraclecorp.com/pls/apex/training_app_dev/seaashm/RequestTraining',
                      cache: false,
                      type: 'POST',
                      contentType: 'application/json; charset=utf-8',
                      data: ko.toJSON(rtr),
                      success: function (rtrdata) {
                          console.log(ko.toJSON(rtrdata));
                          alert("Training requested");
                      }
                  }).fail(function (xhr, textStatus, err) {
                      alert(err);
                  });
                }
                var url = trainingbaseurl + "editClasses";
                $.ajax({
                    url: url,
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(reqbody),
                    success: function (data) {
                        self.showToastDialog("Class Successfully Updated", true, 1000);
                        console.log("Class Successfully Updated : " + ko.toJSON(data));
                        $("#editclass").ojDialog("close");
                        resetClass();
                        self.fetchcourses();
                        updateCourseClass();
                        
                    }
                }).fail(function (xhr, textStatus, err) {
                    // alert(err);
                    self.showToastDialog("Class Failed Updated", true, 2000);
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
                        self.showToastDialog("Class Successfully Deleted", true, 1000);
                        console.log("Class Successfully Deleted");
                        $("#editclass").ojDialog("close");
                        resetClass();
                        self.fetchcourses();
                        updateCourseClass();
                    }
                }).fail(function (xhr, textStatus, err) {
                    // alert(err);
                    self.showToastDialog("Class Failed Updated", true, 2000);
                });
            }


            saveCourse = function () {

                console.log("saving course . . .");
                var mappedCategories = new Array();
                self.selectedCategoriesForCourse().forEach(function (element) {
                    mappedCategories.push(element.category_id);
                });
                self.cclass().status(self.cclass().status()[0]);

                var coursedata = {
                    course_id: self.createCourse().course_id(),
                    name: self.createCourse().name(),
                    description: self.createCourse().description(),
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
                        self.showToastDialog("Course Successfully Updated", true, 1000);
                        console.log("Course Successfully Updated");
                        $("#edittraining").ojDialog("close");
                        resetCourse();
                        self.fetchcourses();
                    }
                }).fail(function (xhr, textStatus, err) {
                    // alert(err);
                    self.showToastDialog("Update Failed!", true, 2000);
                    self.fetchcourses();
                });

            }


            editClass = function (class_to_edit) {
                resetClass();
                console.log(Date.parse(class_to_edit.enrollment_end_date).toString('dd MMM yyyy'));
                self.cclass().class_id(class_to_edit.class_id);
                self.cclass().description(class_to_edit.description);
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

                var htmlData = "";
                $(".classlist").empty();
                var classList = self.createCourse().classes();

                for (var i = 0; i < classList.length; i++) {

                    htmlData += "<ul><li>";
                    htmlData += "<i class=\"fa fa-trash-o\" style=\"cursor: pointer;float: right;margin-left: 5px\" title=\"Delete Course\" onclick=\"deleteClass()\" target=\"_blank\"></i><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\" style=\"cursor: pointer;float: right;margin-left: 5px\" title=\"Edit Course\" onclick=\'editClass(" + JSON.stringify(classList[i]) + ")\' target=\"_blank\"></i>";
                    htmlData += "<p>City: " + classList[i].city + "</p>";
                    htmlData += "<P> Strength: " + classList[i].class_size + "</P>";
                    htmlData += "<P> Enroll By: " + Date.parse(classList[i].enrollment_end_date).toString('dd MMM yyyy') + "</P>";
                    // htmlData += "</li></ul>"
                }
                $(".classlist").append(htmlData);
            }


            // EDIT EXISTING COURSE FOR TRAINING
            edittraining = function (course) {
                var courseid = course.course_id;

                var courseToEdit = findCourseById(courseid);
                resetCourse();

                if (courseToEdit != undefined) {

                    console.log(ko.toJSON(courseToEdit));
                    self.createCourse().course_id(courseToEdit.course_id);
                    self.createCourse().name(courseToEdit.name);
                    self.createCourse().description(courseToEdit.description);
                    self.createCourse().contact_email(courseToEdit.contact);
                    self.createCourse().cloud_onpremise().push(courseToEdit.prodcut_type);
                    self.createCourse().training_level().push(courseToEdit.training_level);
                    self.createCourse().training_type().push(courseToEdit.training_type);
                    self.createCourse().status().push(courseToEdit.status);
                    self.createCourse().classes(courseToEdit.classes);
                    self.createCourse().categories(courseToEdit.categories);

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
                for (var i = 0; i < self.createCourse().categories().length; i++) {
                    self.selectedCategoriesForUi.push(self.createCourse().categories()[i].name);
                    self.selectedCategoriesForCourse().push(self.createCourse().categories()[i]);

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
                            self.showToastDialog("Course Successfully deleted", true, 2000);
                            self.fetchcourses();
                        }
                    }).fail(function (xhr, textStatus, err) {
                        // alert(err);
                        self.showToastDialog("Course Deletion Failed!", true, 2000);
                    });

                }

            }

            getCategoryHierarchy();
            $("#tree").on("ojoptionchange", function(e, ui) 
            {
                if (ui.option == "selection") 
                {
                    // show selected nodes
                    var selected = _arrayToStr(ui.value) ;
                    $("#results").html("<label> id = " + selected + "</label>");
                }
            });
            function _arrayToStr(arr)
            {
                var s = "" ;
                $.each(arr, function(i, val)
                {
                    if (i) {s += ", " ;}
                    console.log(val)
                    s += $(arr[i]).attr("id") ;
                }) ;
                return s ;
            };

            categoryfamily = function (e, ui) 
            {
                console.log(ui.value[0].innerText);
                // console.log(ui.value[0].parentNode);
                populateSubcategory(ui,ui.value[0]);
                //               $( ".oj-tree-title" )
                // .parentsUntil( $( "tree" ), ".yes" )
                // if (ui.value[0].id != undefined) {
                //     self.rtrcategory.push({ui.value[0].innerText});
                // }
            }
        }
        return new DashboardViewModel();
    }
);