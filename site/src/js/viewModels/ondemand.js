define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojcheckboxset', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojdialog',
        'ojs/ojselectcombobox', 'ojs/ojswitch', 'ojs/ojdialog', 'ojs/ojcollapsible', 'ojs/ojaccordion', 'ojs/ojtree',
    ],
    function (oj, ko, $) {

        function DashboardViewModel() {

            self.newExpanded = ko.observableArray();
            self.course = ko.observable();
            self.course_id = ko.observable('');
            self.course_name = ko.observable('');
            self.course_description = ko.observable('');
            self.course_url = ko.observable('');
            self.course_summary = ko.observable('');
            self.onDemandSelectedCategoriesForCourse = ko.observableArray([]);
            self.onDemandSelectedCategoriesForUi = ko.observableArray([]);
            self.onDemandCategoryForUi = ko.observableArray([]);
            self.roles_select = ko.observableArray([]);
            self.role_list = ko.observableArray([]);
            self.selected_vals = ko.observableArray([]);
            self.selected_vals = ko.observableArray([]);            
            self.main_category_list = ko.observableArray([]);
            var ondemand_ckeditor_data = "";
            var ondemand_ckeditor_instance_data = "";
            self.toolslist = ko.observableArray([]);
            var categoriesres;
            var categories_from_api = new Array();
            var course_id_for_edit;
            self.message = ko.observable('');
            var updated_url;
            var error_count;
            // var sub_categories = new Array();
            var all_categories_ids = new Array();
            self.searchtext_val = ko.observable('');

            // MODAL HANDLE START
            self.createCourseModalOpen = function () {
                emptyAllFields();
                ondemand_ckeditor_instance_data = "";
                $("#add_desc").show();
                $("#edit_desc").hide();
                $("#create_course_id").show();
                $("#edit_course_id").hide();
                $("#ondemand_course_dialog" ).ojDialog( {title: "Create Course" } );                
                $("#ondemand_course_dialog").ojDialog("open");
            }
            editCourseModalOpen = function (edit_course) {
                emptyAllFields();
                self.course_name(edit_course.name);
                self.course_description(edit_course.description);
                ondemand_ckeditor_instance_data = edit_course.description;
                self.selected_vals(edit_course.roles);
                self.course_url(edit_course.url);
                self.course_summary(edit_course.summary);
                course_id_for_edit = edit_course.course_id;
                var roles_from_api = new Array();
                for (var i = 0; i < edit_course.roles.length; i++) {
                        roles_from_api.push(edit_course.roles[i].role_id);
                }     
                self.selected_vals(roles_from_api);  
                categories_from_api = edit_course['CAT LIST'];
                for(var i = 0; i<categories_from_api.length; i++){
                    self.onDemandSelectedCategoriesForUi.push(categories_from_api[i]['Category Name']);
                    self.onDemandSelectedCategoriesForCourse.push({
                        category_id: categories_from_api[i]['Category ID'],
                        name: categories_from_api[i]['Category Name']
                    });
                }
                $("#add_desc").hide();
                $("#edit_desc").show();
                $("#create_course_id").hide();
                $("#edit_course_id").show();
                $("#ondemand_course_dialog" ).ojDialog( {title: "Edit Course" } );
                $("#ondemand_course_dialog").ojDialog("open");
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
            showOnDemandCourseDetails = function (course) {
                self.course_description(course.description);
                $("#ondemand_course_details").ojDialog("open");
            }            
            deleteOnDemandCourse = function (course) {
                openDeleteModal(course.course_id);
            }
            closeDeleteModal = function () {
                $("#delete_ondemand").ojDialog("close");
            }
            //MODAL HANDLE END
            
            //BUSINESS LOGIC START
            getOnDemandCategoryHierarchy = function () {
                $.getJSON(trainingbaseurl+"getOndemandTrainingCategories").
                then(function (response) {

                    categoriesres = response.categories;
                    self.main_category_list([]);
                    for (var i = 0; i < categoriesres.length; i++) {
                        all_categories_ids.push(categoriesres[i].id);
                        self.main_category_list.push({
                            name: categoriesres[i].name,
                            id: categoriesres[i].id
                        })
                    } 
                    self.onDemandCategoryForUi([]);
                    console.log("forUI=====>"+ko.toJSON(self.onDemandCategoryForUi()));
                    if (categoriesres.length > 0) {
                        processOnDemandCategoryList(categoriesres, self.onDemandCategoryForUi());
                    }
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
                }
            }

            onDemandCategorySelected = function (e, ui) {
                if (ui.value[0].id != undefined) {
                    self.onDemandSelectedCategoriesForCourse.push({
                        category_id: ui.value[0].id,
                        name: ui.value[0].innerText
                    });
                    self.onDemandSelectedCategoriesForUi.push(ui.value[0].innerText);
                    self.onDemandSelectedCategoriesForUi.id = ui.value[0].innerText;
                }
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

            self.createOndemandCourse = function () {
                validation(self.course_url());
                if (error_count == 0){
                    var mappedCategories = new Array();
                    self.onDemandSelectedCategoriesForCourse().forEach(function (element) {
                        mappedCategories.push(element.category_id);
                    });
                    var coursedata = {
                        name: self.course_name(),
                        description: ondemand_ckeditor_instance_data,
                        categories: mappedCategories,
                        roles: self.selected_vals(),
                        URL:updated_url,
                        SUMMARY:self.course_summary()
                    }
                    var ondemand_course_data = {courses:new Array(coursedata)};
                    console.log("On demand create data : "+ko.toJSON(ondemand_course_data));
                    $.ajax({
                        url: trainingbaseurl+"createTrainingCourse",
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        data: ko.toJSON(ondemand_course_data),
                        success: function (data) {
                            fetchondemand();
                            $("#ondemand_course_dialog").ojDialog("close");
                            showMessage("Course Successfully Created");
                        }
                    }).fail(function (xhr, textStatus, err) {
                        showMessage("Failed to Create Course");
                    });
                }
            }
            self.editOndemandCourse = function () {
                validation(self.course_url());
                var mappedCategories = new Array();
                self.onDemandSelectedCategoriesForCourse().forEach(function (element) {
                    mappedCategories.push(element.category_id);
                });
                var coursedata = {
                    course_id: course_id_for_edit,
                    name: self.course_name(),
                    description: ondemand_ckeditor_instance_data,
                    categories: mappedCategories,
                    roles: self.selected_vals(),
                    URL: updated_url,
                    SUMMARY:self.course_summary()
                }
                var ondemand_course_data = {courses:new Array(coursedata)};   
                $.ajax({
                    url: trainingbaseurl+"editTrainingCourse",
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(ondemand_course_data),
                    success: function (data) {
                        fetchondemand();
                        $("#ondemand_course_dialog").ojDialog("close");
                        showMessage("Course Successfully Updated");
                    }
                }).fail(function (xhr, textStatus, err) {
                    showMessage("Failed to Update Course");
                });                   
            }	

            fetchondemand = function () {
			 $.getJSON(trainingbaseurl+'getCategoriesCourses', function (data) { 
                self.toolslist(data);
                })
			}

            getCategoryObjects = function (categories) {
                for (var i = 0; i < categories.length; i++) {
                    var item = {
                        title: categories[i].name,
                        id: categories[i].id
                    }
                    if (categories[i].categories != undefined && categories[i].categories.length > 0) {
                        getCategoryObjects(categories[i].categories);

                    }
                    sub_categories.push(item);
                }
            }
            
            openDeleteModal = function (delete_id) {
                $("#delete_ondemand").ojDialog("open");
                $("#delete_confirm").click(function () {
                    $.ajax({
                        url: trainingbaseurl+"deleteTrainingCourse/"+delete_id,
                        method: 'DELETE',
                        success: function () {
                            fetchondemand();
                            $("#delete_ondemand").ojDialog("close");
                            showMessage("Course Deleted Successfully");
                        },
                        fail: function (xhr, textStatus, err) {
                            showMessage("Failed to Delete Course");
                        },
                        error: function (xhr, textStatus, err) {
                            showMessage("Failed to Delete Course");
                        }
                    });
                });

            }

            refineOnDemand = function () {
                var selected_roles_refine = new Array();
                var selected_categories_refine = new Array();
                $("input:checkbox[name=roles]:checked").each(function(){
                    selected_roles_refine.push($(this).val());
                });
                $("input:checkbox[name=categories]:checked").each(function(){
                    selected_categories_refine.push($(this).val());
                });
                console.log("roles--"+selected_roles_refine);
                console.log("cats--"+selected_categories_refine);
                console.log("free text--"+self.searchtext_val());
                $.ajax({
                    url: trainingbaseurl+"getCategoriesCourses",
                    cache: false,
                    type: 'GET',
                    headers: {
                        "role_id": selected_roles_refine,
                        "category_id": selected_categories_refine,
                        "freetextsearch": self.searchtext_val()
                    },
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        self.toolslist(data);
                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log(err);
                });                
            }

            resetOnDemand = function () {
                $("input:checkbox[name=roles]:checked").each(function(){
                    $(this).prop('checked',false);
                });
                $("input:checkbox[name=categories]:checked").each(function(){
                    $(this).prop('checked',false);
                });
                fetchondemand();
            }
            //BUSINESS LOGIC END

            //MODULAR COMMON FUNCTIONS START
            isUnderCharacterLimit=function(text){
               var pass=true;
                if(text.length>20000){
                    showMessage("Please keep the description text below 20000 characters. Current character count "+text.length);
                    pass=false;
                }
                return pass;
            }

            emptyAllFields = function() {
                self.course_name('');
                self.course_url('');
                self.course_summary('');
                self.course_description('');
                self.selected_vals([]);
                self.onDemandSelectedCategoriesForUi([]);
            }

            validation = function(input_url) {
                error_count = 0;
                if (self.onDemandSelectedCategoriesForCourse().length < 1) {
                    showMessage("Please select at least one category");
                    error_count++;
                }
                if (self.selected_vals() < 1) {
                    showMessage("Please select at least one role");
                    error_count++;
                }
                if (self.course_name().length < 1) {
                    showMessage("Please enter valid course name");
                    error_count++;
                }                

                updated_url = (input_url.indexOf('://') === -1) ? 'http://' + input_url : input_url;   
            }            

            function showMessage(message) {
                self.message(message);
                var x = document.getElementById("snackbar");
                x.className = "show";
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }

            self.expandAll = function () {
                for(var i=0; i<all_categories_ids.length; i++) {
                    $("#id_" + all_categories_ids[i]).ojCollapsible({ "expanded": true });
                }
            }
            
            self.collapseAll = function () {
                for(var i=0; i<all_categories_ids.length; i++) {
                    $("#id_" + all_categories_ids[i]).ojCollapsible({ "expanded": false });
                }                
            }
            //MODULAR COMMON FUNCTIONS END

            //FUNCTION CALLS ON PAGE LOAD START
			getOnDemadnRoleData();
            getOnDemandCategoryHierarchy();
            fetchondemand();
            //getOnDemandCategoryHierarchy();
            //FUNCTION CALLS ON PAGE LOAD END
        }
		
        return new DashboardViewModel();
    }
);
