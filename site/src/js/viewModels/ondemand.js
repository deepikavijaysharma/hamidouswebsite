define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojcheckboxset', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojdialog',
        'ojs/ojselectcombobox', 'ojs/ojswitch', 'ojs/ojdialog', 'ojs/ojcollapsible', 'ojs/ojaccordion', 'ojs/ojtree',
    ],
    function (oj, ko, $) {

        function DashboardViewModel() {

            this.newExpanded = ko.observableArray();
            self.onDemandRequest = function () {
                alert("request training");
            }
            self.course = ko.observable();
            self.course_id = ko.observable('');
            self.course_name = ko.observable('');
            self.onDemandSelectedCategoriesForCourse = ko.observableArray([]);
            self.onDemandSelectedCategoriesForUi = ko.observableArray([]);
            self.onDemandCategoryForUi = ko.observableArray([]);
            self.roles_select = ko.observableArray([]);
            self.role_list = ko.observableArray([]);
            self.selected_vals = ko.observableArray([]);
            var ondemand_ckeditor_data = "";
            var ondemand_ckeditor_instance_data = "";
            self.toolslist = ko.observableArray([]);


            self.onDemandCreate = function () {
                $("#ondemand_course_dialog").ojDialog("open");
            }
            
            var allData = function(name, children) {
                this.name = name;
                this.children = ko.observableArray(children);
            }            

            self.openODemandDescriptionModal = function () {
                alert("open create course ck editor");
            }

            getOnDemandCategoryHierarchy = function () {
                $.getJSON(trainingbaseurl+"getOndemandTrainingCategories").
                then(function (response) {

                    var categoriesres = response.categories;
                    self.onDemandCategoryForUi([]);
                    if (categoriesres.length > 0) {
                        processOnDemandCategoryList(categoriesres, self.onDemandCategoryForUi());
                    }
                    // console.log(ko.toJSON(self.categoryForUi()));
                });
            }

            processOnDemandCategoryList = function (categories, childarray) {
                for (var i = 0; i < categories.length; i++) {
                    var item = {
                        title: categories[i].name,
                        attr: {
                            id: categories[i].id
                        }
                    }
                    if (categories[i].categories != undefined && categories[i].categories.length > 0) {
                        item.children = new Array();
                        processOnDemandCategoryList(categories[i].categories, item.children);

                    }
                    childarray.push(item);
                    //console.log("==childarray=="+ko.toJSON(childarray));
                }
            }

            onDemandCategorySelected = function (e, ui) {
                if (ui.value[0].id != undefined) {
                    self.onDemandSelectedCategoriesForCourse.push({
                        category_id: ui.value[0].id,
                        name: ui.value[0].innerText
                    });
                    //self.onDemandSelectedCategoriesForUi.push(ui.value[0].innerText);
                    //THIS IS BEING DONE TO SEND DATA IN CREATE COURSE..ONCE COURSES ARE GETTING RENDERED
                    //IN UI, YOU CAN FOLLOW TRAINING.JS APPROACH
                    self.onDemandSelectedCategoriesForUi.push({
                        category_id: ui.value[0].id,
                        name: ui.value[0].innerText
                    });
                    //self.onDemandSelectedCategoriesForUi.id = ui.value[0].innerText;

                }console.log("-------"+ko.toJSON(self.onDemandSelectedCategoriesForUi()));
            }

            onDemandSelectedCategoryChanged = function (e, ui) {
                if (ui.previousValue != undefined && ui.previousValue.length > ui.value.length) {
                    var temparray = new Array();
                    for (var i = 0; i < self.onDemandSelectedCategoriesForCourse().length; i++) {
                        if (ui.value.includes(self.onDemandSelectedCategoriesForCourse()[i].name)) {
                            temparray.push(self.onDemandSelectedCategoriesForCourse()[i]);
                        }
                    }
                    self.onDemandSelectedCategoriesForCourse(temparray);
                }
            }
            
            getOnDemadnRoleData = function () {
                $.getJSON(trainingbaseurl + "getFiltersV2").
                then(function (reasons) {

                    self.role_list([]);
                    var roleist_response = reasons.roles;
                    for (var i = 0; i < roleist_response.length; i++) {

                        self.role_list.push({
                            name: roleist_response[i].name,
                            id: roleist_response[i].id
                        })
                        self.roles_select.push({
                            label: roleist_response[i].name,
                            value: roleist_response[i].id
                        })

                    } 
                });
            }

            openODemandDescriptionModal = function () {
               if(CKEDITOR.instances.ondemand_course_editor){
                ondemand_ckeditor_data = ondemand_ckeditor_instance_data;
                CKEDITOR.instances.ondemand_course_editor.destroy(true);
               }
               ondemand_ckeditor_data = ondemand_ckeditor_instance_data;
                CKEDITOR.replace('ondemand_course_editor', {
                    height: 500,
                    removePlugins: 'maximize'
                    
                });  
                $( "#ondemand_course_modal" ).on( "ojbeforeclose", function( event, ui )
                {
                    ondemand_ckeditor_instance_data = CKEDITOR.instances.ondemand_course_editor.getData();
                    isUnderCharacterLimit(ondemand_ckeditor_instance_data);
                });
                CKEDITOR.instances.ondemand_course_editor.setData(ondemand_ckeditor_data);
                $("#ondemand_course_modal").ojDialog("open");
                               
            }             
            isUnderCharacterLimit=function(text){
               var pass=true;
                if(text.length>20000){
                    self.showToastDialog("Please keep the description text below 20000 characters. Current character count "+text.length);
                    pass=false;
                }
                return pass;
            }

            self.createOndemandCourse = function () {
                var mappedCategories = new Array();
                self.onDemandSelectedCategoriesForUi().forEach(function (element) {
                    mappedCategories.push(element.category_id);
                });

                var mappedRoles = new Array();
                self.selected_vals().forEach(function (element) {
                    mappedRoles.push(element.value);
                });
                var coursedata = {
                    name: self.course_name(),
                    description: ondemand_ckeditor_instance_data,
                    categories: mappedCategories,
                    roles: self.selected_vals()
                }
                var ondemand_course_data = {courses:new Array(coursedata)};
                $.ajax({
                    url: trainingbaseurl+"createTrainingCourse",
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(ondemand_course_data),
                    success: function (data) {
                        console.log("Course Successfully Updated");
                        fetchondemand();
                        $("#ondemand_course_dialog").ojDialog("close");
                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log(err);
                });
            }
			
            fetchondemand = function () {
			 $.getJSON(trainingbaseurl+'getCategoriesCourses', function (data) { 
                self.toolslist(data); 
                })
			}

			getOnDemadnRoleData();
            getOnDemandCategoryHierarchy();
            fetchondemand();
         
        }
		
        return new DashboardViewModel();
    }
);
