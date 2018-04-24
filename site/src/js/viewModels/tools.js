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
            self.currentRole = ko.observable('0');
			self.expandedValue = ko.observable(false);
            self.currentCategory = ko.observable('0');
            self.categoryForUi = ko.observableArray([]);
            self.catlist = ko.observableArray([]);
            this.newExpanded = ko.observableArray([]);
			 this.newExpanded.push({"id":"CSM"});
            var editor_instance_data3 = "";
            this.val = ko.observableArray(["CH"]);
			
			
		    
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
            self.selectedcategories = ko.observableArray([]);
            self.expand = ko.observableArray([]);

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
                console.log(self.selectedcategories());
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
                console.log(allcourses);
                console.log(catselected);                
                for (var k = 0; k < allcourses.length; k++) { // console.log(allcourses[k]);
                    var categoryobj = self.getcategorybyname(catselected);
                    categoryobj.categories.push({
                        id: allcourses[k].id,
                        name: allcourses[k].name,
                        category: catselected,
                        description: allcourses[k].description,
                        url: allcourses[k].link
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
            refineupdate = function (desc) 
            {
                var type = desc.name;
                if (desc.checked) 
                {
                    switch (type) 
                    {
                        case "category":
                            // setuncheck('category');
                            desc.checked = true;
                            self.refinecategories.removeAll();
                            self.refinecategories.push(desc.defaultValue);
                            break;

                        case "roles":
                            // setuncheck('roles');
                            desc.checked = true;
                            self.refineroles.removeAll();
                            self.refineroles.push(desc.defaultValue);
                            break;
                    }
                } 
                else 
                {
                    alltools();
                }
            }
            alltools = function()
            {
                $.ajax({
                    url: "http://solutionengineering-devops.us.oracle.com:8080/tools/contents",
                    method: 'GET',
                    success: function (allcourses) {
                        console.log(allcourses);
                        for (var w = 0; w < allcourses.length; w++) {
                            for (var y = 0; y < allcourses[w].contents.length; w++) {
                                self.processTnRFromService(allcourses[w].contents, allcourses[w].name);
                                self.expand.push(allcourses[w].name);
                                //self.expandall(self.expand());
								console.log("allids "+self.expand());
                            }
                        }
                        
                    },
                    error: function (xhr) {
                        console.log(xhr);
                    }
                });
            }
            alltools();

            self.refinetools = function () 
            {
                self.selectedcategories([]);
                var selectedcategories = ko.toJSON(self.refinecategories()).replace('[', '').replace(']', '').replace(/"/g, '');
                var selectedroles = ko.toJSON(self.refineroles()).replace('[', '').replace(']', '').replace(/"/g, '');
                if (selectedcategories == "all" || selectedroles == "all") {
                    alltools();
                }
                else {
                    var headerobj = {
                        categoryid: selectedcategories,
                        roleid: selectedroles
                    }
                    console.log(headerobj);
                    $.ajax({
                        url: "http://solutionengineering-devops.us.oracle.com:8080/tools/contents/find",
                        cache: false,
                        type: 'GET',
                        headers: headerobj,
                        contentType: 'application/json; charset=utf-8',
                        success: function (toolsdata) 
                        {
                            var refinetrrole = searchdata(selectedroles, self.roles());
                            var refinetrcategories = searchdata(selectedcategories, self.refinelist());
                            $.ajax({
                                url: "http://solutionengineering-devops.us.oracle.com:8080/tools/contents",
                                method: 'GET',
                                success: function (allcourses) {
                                    console.log(allcourses);
                                    for (var w = 0; w < allcourses.length; w++) 
                                    {
                                        if (allcourses[w].contents.length > 0)
                                        {
                                            self.getcategorybyname(toolsdata[0].name);
                                            for (var y = 0; y < allcourses[w].contents.length; w++) {
                                                if (toolsdata[0].name === allcourses[w].name) { // console.log(allcourses[w].links);
                                                    self.processTnRFromService(allcourses[w].contents, allcourses[w].name);
                                                    self.expand.push(allcourses[w].name);
                                                    //self.expandall(self.expand());
                                                }
                                            }
                                        }
                                    }//console.log(ko.toJSON(self.expand()));
                                },
                                error: function (xhr) {
                                    console.log(xhr);
                                }
                            });
                        }
                    }).fail(function (xhr, textStatus, err) {
                        console.log(err);
                    });
                }
            }

            self.expandall = function () {
				self.expandedValue(true);
				
            }
            // console.log("expand items:"+ self.expand());
            self.closeall = function () {
               self.expandedValue(false);
            }

            setuncheck = function (classname) {
                var x = document.getElementsByClassName(classname);
                for (var i = 0; i < x.length; i++) {
                    x[i].checked = false;
                }
            }

            // TOAST MESSAGE DIALOG
            self.msg = ko.observable("");

            self.showToastDialog = function (msg, timeinmillisec) {
                self.msg(msg);
                $("#toastdiv").ojDialog("open");
                if (timeinmillisec > 0) {
                    setTimeout(function () {
                        $("#toastdiv").ojDialog("close");
                    }, timeinmillisec);
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

            getLeftpanelData = function () 
            {
                $.getJSON("http://solutionengineering-devops.us.oracle.com:8080/tools/filters").then(function (response) {
                    // ROLES
                    self.roles([]);
					 self.roles.push({
                            name: 'All',
                            id: '0'
                        })
                    
                    for (var i = 0; i < response.rolesList.length; i++) {
                        self.roles.push({
                            name: response.rolesList[i].role,
                            id: response.rolesList[i].id
                        })
                    }
                    // CATEGORIES
                    self.refinelist([]);
					self.refinelist.push({
                             name: 'All',
                            id: '0'
                        })
                    for (var j = 0; j < response.typesList.length; j++) {
                        self.refinelist.push({
                            id: response.typesList[j].id,
                            name: response.typesList[j].name
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