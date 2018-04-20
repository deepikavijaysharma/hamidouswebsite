/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 
    'ojs/ojradioset', 'ojs/ojaccordion', 'ojs/ojcollapsible', 'ojs/ojmodule', 'ojs/ojmoduleanimations', 'ojs/ojanimation','ojs/ojdialog', 'ojs/ojbutton','ojs/ojinputtext','ojs/ojtree','ojs/ojselectcombobox'],
    function (oj, ko, $) {

        function DashboardViewModel() 
        {
            var self = this;
            self.currentRole = ko.observable('all');
            self.currentCategory = ko.observable('all');
            self.categoryForUi = ko.observableArray([]);
            self.catlist = ko.observableArray([]);
            this.newExpanded = ko.observableArray();
            var editor_instance_data3 = "";
            this.val = ko.observableArray(["CH"]);
            self.expandall = function(){
                $("#accordionPage").ojAccordion( { "expanded": ['c1','c2','c3','c4'], "multiple": true } );
            }
            self.closeall = function(){
                $("#accordionPage").ojAccordion( { "expanded": []} );
            }
		     
            self.readMore = function()
            {
                $('#readmorelink').hide();
                $('#readlesslink').show();
                $('#moretext').toggle('slow', function() {   
                });
            }
			  
            self.readLess = function()
            {	 
                $('#readmorelink').show();
                $('#readlesslink').hide();
                $('#moretext').toggle('slow', function() {   
                });
            } 
		  
            self.setFilter = function(data, event) 
            {			 
                var id = event.target.id;
                console.log(event.target);
                if ($("input#"+id).is(":checked")) 
                {			
                    $(".toolsrow").hide();
                    $("."+self.currentRole()+"."+self.currentCategory()).show();	
                }
                else{
                }
                return true;
            } 
            self.refinecategories = ko.observableArray([]);
            self.refineroles = ko.observableArray([]);
            self.roles = ko.observableArray([]);
            self.refinelist = ko.observableArray([]);
            // self.categories = ko.observableArray([]);
            self.selectedcategories = ko.observableArray([]);
            self.refinecourses = function () {
                self.selectedcategories([]);
                var selectedcategories = ko.toJSON(self.refinecategories()).replace('[', '').replace(']', '').replace(/"/g, '');
                var selectedroles = ko.toJSON(self.refineroles()).replace('[', '').replace(']', '').replace(/"/g, '');
                var headerobj = {
                    category_id: selectedcategories,
                    role_id: selectedroles
                }
                var refinetrrole = searchdata(selectedroles, self.roles());
                var refinetrcategories = searchdata(selectedcategories, self.refinelist());

                // self.selectedcategories.push({
                //     name: refinetrcategories,
                //     categories: ko.observableArray([])
                //     });

                $.ajax({
                    url: "http://solutionengineering-devops.us.oracle.com:8080/resources/link/list",
                    method: 'GET',
                    success: function (allcourses) 
                    {// console.log(allcourses);
                        for (var w = 0; w < allcourses.length; w++) {
                            if (refinetrcategories===allcourses[w].name) { // console.log(allcourses[w].links);
                                self.processTnRFromService(allcourses[w].links, allcourses[w].name);
                            }
                        }
                    },
                    error: function (xhr) {
                        console.log(xhr);
                    }
                });
            }
            self.getcategorybyname = function (catname) {
                // Look if the category is already present in the array
                for (var i = 0; i < self.selectedcategories().length; i++) {
                    if (self.selectedcategories()[i].name === catname) {
                        return self.selectedcategories()[i];
                    }
                }
                // Category is not present so we need to insert the category in the array
                self.selectedcategories.push({
                    name: catname,
                    categories: ko.observableArray([])
                });
                var lastindex = self.selectedcategories().length - 1;
                return self.selectedcategories()[lastindex];
            }

            searchdata = function (nameKey, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                    if (myArray[i].id === nameKey) {
                        return myArray[i].name;
                    }
                }
            }

            self.processTnRFromService = function (allcourses, catselected) 
            {
                for (var k = 0; k < allcourses.length; k++) { // console.log(allcourses[k]);
                    var categoryobj = self.getcategorybyname(catselected);
                    categoryobj.categories.push({
                        name: allcourses[k].name,
                        category: catselected,
                        description: allcourses[k].description,
                        url: allcourses[k].url
                    });
                }
            }

            edittools = function (course) 
            {
                $("#edittools").ojDialog("open");
            }
				
            deletetools = function (coursedata) 
            {
                if (confirm("Do you really wish to delete the course?"))
                {
                    var course = new Array();
                    console.log("Deleting tools. . . ");
                }
            }		

            self.resetCourseFilters = function () {
                setuncheck('category');
                setuncheck('roles');
                self.refinecategories([]);
                self.refineroles([]);
            }
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

                        case "roles":

                            setuncheck('roles');
                            desc.checked = true;
                            self.refineroles.removeAll();
                            self.refineroles.push(desc.defaultValue);
                            break;

                    }


                } else {
                    switch (type) {
                        case "category":
                            self.refinecategories.remove(desc.defaultValue);
                            break;

                        case "roles":
                            self.refineroles.remove(desc.defaultValue);
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
            getCategoryHierarchy = function () 
            {
                $.getJSON(trainingbaseurl + "getCategories").then(function (response) 
                {
                    var categoriesres = response.categories;
                    self.categoryForUi([]);
                    if (categoriesres.length > 0) 
                    {
                        processCategoryList(categoriesres, self.categoryForUi());
                    }
                    // console.log(ko.toJSON(self.categoryForUi()));
                });
            }

            processCategoryList = function (categories, childarray) 
            {
                for (var i = 0; i < categories.length; i++) 
                {
                    var item = {
                        title: categories[i].name,
                        attr: {
                            id: categories[i].id
                        }
                    }
                    if (categories[i].categories != undefined && categories[i].categories.length > 0) 
                    {
                        item.children = new Array();
                        processCategoryList(categories[i].categories, item.children);
                    }
                    childarray.push(item);
                }
            }
           
            categorySelected = function (e, ui) 
            {
                if (ui.value[0].id != undefined) 
                {
                    self.selectedCategoriesForCourse.push({
                        category_id: ui.value[0].id,
                        name: ui.value[0].innerText
                    });
                    self.selectedCategoriesForUi.push(ui.value[0].innerText);
                    self.selectedCategoriesForUi.id = ui.value[0].innerText;
                }
            }
			
			selectedCategoryChanged = function (e, ui) {
                if (ui.previousValue != undefined && ui.previousValue.length > ui.value.length) 
                {
                    var temparray = new Array();
                    for (var i = 0; i < self.selectedCategoriesForCourse().length; i++) 
                    {
                        if (ui.value.includes(self.selectedCategoriesForCourse()[i].name)) 
                        {
                            temparray.push(self.selectedCategoriesForCourse()[i]);
                        }
                    }
                    self.selectedCategoriesForCourse(temparray);
                }
            }

            //  VARIABLES FOR LEFT PANEL CATEGORIES 
            self.refinelist = ko.observableArray([]);
            self.roles = ko.observableArray([]);

            getLeftpanelData = function () {
                $.getJSON(trainingbaseurl + "getFiltersV2").
                    then(function (reasons) {

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
                $.getJSON("http://solutionengineering-devops.us.oracle.com:8080/resources/link/list").then(function (response) {
                    // CATEGORIES
                    self.refinelist([]);// console.log(response);
                    for (var i = 0; i < response.length; i++) {
                        self.refinelist.push({
                            id: response[i].id,
                            name: response[i].name
                        })
                    }
                });
            }

            getLeftpanelData();
			
            openEditToolsDescriptionModal = function () 
            {
                if(CKEDITOR.instances.edit_course_editor)
                {
                    intermediate_data3 = editor_instance_data3;
                    CKEDITOR.instances.edit_course_editor.destroy(true);
                }
                intermediate_data3 = editor_instance_data3;
                CKEDITOR.replace('edit_course_editor',{
                    height: 500,
                    removePlugins: 'maximize'
                });  
                $("#edit_course_modal").on("ojbeforeclose", function(event,ui)
                {
                    editor_instance_data3 = CKEDITOR.instances.edit_course_editor.getData();
                    isUnderCharacterLimit(editor_instance_data3);
                });
                CKEDITOR.instances.edit_course_editor.setData(intermediate_data3);
                $("#edit_tools_desc_modal").ojDialog("open");                                   
            }  
			
            self.createtools = function () 
            {
                $("#createtools").ojDialog("open");
            }
			getCategoryHierarchy();
        }
        return new DashboardViewModel();
    }
);