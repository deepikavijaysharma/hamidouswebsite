/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 'ojs/ojcheckboxset', 'ojs/ojcollapsible', 'ojs/ojanimation', 'ojs/ojchart', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojdialog', 'ojs/ojdatetimepicker',
             'ojs/ojselectcombobox', 'ojs/ojtimezonedata',],
    function (oj, ko, $) {

        function DashboardViewModel() {


            var self = this;
            this.val = ko.observableArray();
            /*---------------------------------ADMIN----------------------------------*/
            // CREATE COURSE
            self.coursetitle = ko.observable('');
            self.courselink = ko.observable('');
            self.coursedesc = ko.observable('');
            self.disabledtab = ko.observable([3,4]);

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

            //-----------------   COMMUNITY CALL   ------------------------//
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
              
            }

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
                }else if(typeof self.callduration() == 'number'){
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
                    call_date: self.date(),
                    call_time: self.starttime().split('T')[1].substring(0,5),
                    duration:self.callduration(),
                    locn: self.callvenue(),
                    meetinglink: self.calllink(),
                    dialin: self.calldialin(),
                    description: self.calldesc(),
                    reflink: self.reflink(),
                    user: ssoemail,
                    recording_link: self.callrecordlink(),
                    mode_of_call: selectedcallmode,
                    role: selectedrole
                }

                console.log(ko.toJSON(call));
                var url = 'http://10.146.89.49:7003/ords/seaashm/seaashm/INS_COMMUNITY_CALLS';

                $.ajax({
                    url: url,
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


            }

            //----------------------- END OF COMMUNITY CALL  ---------------------//




            //------------------   CATEGORY  -------------------//


            // GET THE CATEGORIES
            getcategories = function () {
                $.getJSON("https://apex.oraclecorp.com/pls/apex/se_cloud_ready_training/training/getCategories").
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
            self.producttype = ko.observableArray([]);
            self.training_levels = ko.observableArray([]);
            self.training_types = ko.observableArray([]);
            self.cities = ko.observableArray([]);
            self.roles = ko.observableArray([]);
            self.selectedcategories = ko.observableArray([]);

            getLeftpanelData = function () {
                $.getJSON("https://apex.oraclecorp.com/pls/apex/se_cloud_ready_training/training/getFiltersV2").
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


                    // console.log(ko.toJSON(self.refinelist()));
                });
            }

            getLeftpanelData();
            // getcategories();

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
                $.getJSON(baseurl + "getCategories").then(function (roleslist) //CODE FOR THE ROLE POPUP
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

            self.closecoursedetails = function () {

                $("#coursedetails").ojDialog("close");
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
            self.detailedClassSize = ko.observable();
            self.detailedprodcut_type = ko.observable();
            self.detailedTrainingLevel = ko.observable();
            self.detailedTrainingType = ko.observable();
            self.detailedClasses=ko.observableArray([]);
            self.detailedContact = ko.observable();
            self.detailedCity = ko.observable();
            self.detailedstate = ko.observable();
            self.coursestatus = ko.observable();
            self.classstatus = ko.observable();
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
                self.detailedSchedule([]);


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
                self.waitlistcount(course.waitlistCount);
                self.detailedCourseId(course.course_id);
                self.detailedClassId(course.class_id);
                self.detailedCatId(course.category_id);
                self.detailedSubCatId(course.subcat_id);
                self.detailedRoles('');
                self.detailedClassSize(course.class_size);
                self.coursestatus(course.course_status);
                self.classstatus(course.class_status);
                self.detailedSchedule(course.schedule);
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
                // var text=self.searchtext.length>0?self.searchtext:'';
                $.ajax({
                    url: baseurl + "getCoursesV2",
                    method: 'GET',
                    headers: {
                        free_text_search: ''
                    },
                    success: function (allcourses) {
                        self.processCoursesFromService(allcourses);
                    },
                    error: function (xhr) {
                        // alert(xhr);
                    }
                });
            }
            self.fetchcourses();

            self.resetCourseFilters=function(){
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
                        url: baseurl + "getCoursesV2",
                        method: 'GET',
                        headers: {
                            free_text_search: text
                        },
                        success: function (allcourses) {
                            self.processCoursesFromService(allcourses);
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
                console.log(ko.toJSON(headerobj));
                $.ajax({
                    url: baseurl + "getCoursesV2",
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
                            desc.checked=true;
                            self.refinecategories.removeAll();
                            self.refinecategories.push(desc.defaultValue);
                            break;

                        case "prodtype":
                            setuncheck('prodtype');
                            desc.checked=true;
                            self.refineproducttype.removeAll();
                            self.refineproducttype.push(desc.defaultValue);
                            break;

                        case "traininglevel":
                            setuncheck('traininglevel');
                            desc.checked=true;
                            self.refinetraininglevel.removeAll();
                            self.refinetraininglevel.push(desc.defaultValue);
                            break;

                        case "trainingtype":
                            setuncheck('trainingtype');
                            desc.checked=true;
                            self.refinetrainingtype.removeAll();
                            self.refinetrainingtype.push(desc.defaultValue);
                            break;

                        case "cities":
                            setuncheck('cities');
                            desc.checked=true;
                            self.refinecitis.removeAll();
                            self.refinecitis.push(desc.defaultValue);
                            break;

                        case "roles":

                            setuncheck('roles');
                            desc.checked=true;
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

            setuncheck=function(classname){
                var x = document.getElementsByClassName(classname);
                for(var i=0;i<x.length;i++){
                    x[i].checked=false;
                }
            }

            self.processCoursesFromService = function (allcourses) {
                //console.log(ko.toJSON(allcourses));
                self.categories([]);
                for (var k = 0; k < allcourses.courses.length; k++) {
                    startday = '';//allcourses.courses[k].schedule[0];
                    var curcourse = allcourses.courses[k];
                    var catagorylist=curcourse.categories;
                    var catlistString=ko.toJSON(self.refinecategories());
                        for(var i=0;i<catagorylist.length;i++){
                            var categoryname = catagorylist[i].name;
                            var catid=catagorylist[i].id;
                            if(catlistString.length==2||catlistString.indexOf(catid)!=-1){
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
                                    classes:curcourse.classes,
                                    roles: curcourse.roles,
                                    subcat_id: curcourse.subcat_id,
                                    start_date: startday == undefined ? "NA" : startday.start_date,
                                    directURL: curcourse.directURL,
                                    courseid: curcourse.course_id,
                                    classid: curcourse.class_id,
                                    contact_email: curcourse.contact,
                                    city: curcourse.city,
                                    state: curcourse.state,
                                    course_status: curcourse.course_status,
                                    class_status: curcourse.class_status,
                                    enrollmentCount: curcourse.enrollmentCount,
                                    waitlistCount: curcourse.waitlistCount,
                                    schedule: curcourse.schedule
                                });
                            }
                    }
                }
                // console.log(ko.toJSON(self.categories ()));
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


            /* ---------------------   COMMUNITY CALLS  -------------------------*/

            // GET THE LIST OF COMUNITY CALLS
            getCommunityCalls = function (texttosearch) {
                console.log(texttosearch);
                $.getJSON("http://10.146.89.49:7003/ords/seaashm/seaashm/" + texttosearch).then(function (data) {
                        var calls = data.items;
                        self.communityCallList([]);
                        self.searchcallstext([]);
                        for (var i = 0; i < calls.length; i++) {
                            self.communityCallList.push({
                                name: calls[i].name != undefined ? calls[i].name : '',
                                speaker: calls[i].speaker != undefined ? calls[i].speaker : '',
                                designation: calls[i].designation != undefined ? calls[i].designation : '',
                                call_date: calls[i].call_date != undefined ? calls[i].call_date.split('T')[0] : '',
                                call_time: calls[i].call_time != undefined ? calls[i].call_time.substring(0,5)+" PT" : '',
                                callduration:calls[i].duration!= undefined ? calls[i].duration+" mins" : 'NA',
                                location: calls[i].locn != undefined ? calls[i].locn : '',
                                meetinglink: calls[i].meetinglink != undefined ? calls[i].meetinglink : '',
                                dialin: calls[i].dialin != undefined ? calls[i].dialin : '',
                                description: calls[i].description != undefined ? calls[i].description : '',
                                mode_of_call:calls[i].mode_of_call != undefined ? calls[i].mode_of_call.replace('$',',') : '',
                                role:calls[i].role != undefined ? ko.toJSON(calls[i].role).replace('[', '').replace(']', '').replace(/"/g, '') : '',
                                recording_link:calls[i].recording_link != undefined ? calls[i].recording_link : '',
                                addl_link:calls[i].addl_link != undefined ? calls[i].addl_link : '',
                                subdescription: calls[i].description != undefined ? calls[i].description.substring(0, 150) + '...' : ''
                            });
                        }
                        // console.log(ko.toJSON(self.communityCallList()));
                    });
            }
            // getCommunityCalls('GetCommunityCallDetails');


            self.resetsearch = function () {
                getCommunityCalls('GetCommunityCallDetails');
                self.searchcallstext([]);
                self.refinecommunitycallroles([]);
                self.refinecommunitycallmodes([]);
                self.refinecommunitycallroles([]);
                setuncheck("refine");
            }

          

            self.searchcallstext = ko.observable('');
            //  SEARCH COMMUNITY CALLS
            searchcommunitycalls = function () {
                var searchtext = '$-$' + ko.toJSON(self.searchcallstext()).replace('[', '').replace(']', '').replace(/"/g, '');
                var roles = '$-$' + ko.toJSON(self.refinecommunitycallroles()).replace('[', '').replace(']', '').replace(/"/g, '');
                var callmodel = '$-$' + ko.toJSON(self.refinecommunitycallmodes()).replace('[', '').replace(']', '').replace(/"/g, '');
                var past = '$-$' + ko.toJSON(self.refinepastcalls()).replace('[', '').replace(']', '').replace(/"/g, '');
                getCommunityCalls('GetCommunityCallDetailsOnFreetextSearch/' + searchtext + '/' + past + '/' + callmodel + '/' + roles);
            }

            loadCommunitycall=function(){
                checkadmin();
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

            // CHECK FOR ADMIN RIGHTS
            checkadminrights = function () {

                if (isAdmin) {
                    $( "#tabs" ).ojTabs( { "disabledTabs": [3,4] } );
                  } else {
                    $( "#tabs" ).ojTabs( { "disabledTabs": [3,4,5] } );
                  }
            }

            
            setInterval(function () {
                checkadminrights();
              }, 500);


            // ENROLL EMPLOYEE FOR A COURSE
            enrollemployee=function(p1,p2,p3){
                alert('Enroll');
            }

            redirecttotrainingapp = function () {
                self.ssowindow = window.open("https://apex.oraclecorp.com/pls/apex/f?p=TRAINING_SCHEDULER:MANAGE_COURSE");
            }
            self.handleOKClose = function () {
                document.querySelector("#coursedetails").close();
            };


        }
        return new DashboardViewModel();
    }
);
