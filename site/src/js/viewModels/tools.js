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

        function DashboardViewModel() {


            var self = this;
          self.currentRole = ko.observable('all');
		  self.currentCategory = ko.observable('all');
		  self.categoryForUi = ko.observableArray([]);
		  this.newExpanded = ko.observableArray();
     	var editor_instance_data3 = "";
		  
		  self.expandall = function(){
				$("#accordionPage").ojAccordion( { "expanded": ['c1','c2','c3','c4'], "multiple": true } );
		  }
		  self.closeall = function(){
				$("#accordionPage").ojAccordion( { "expanded": []} );
		  }
		 
    
		  self.readMore = function(){
			  $('#readmorelink').hide();
			  $('#readlesslink').show();
			  $('#moretext').toggle('slow', function() {   
  			 });
			  
			  }
			  
			 self.readLess = function(){	 
			  $('#readmorelink').show();
			  $('#readlesslink').hide();
			  $('#moretext').toggle('slow', function() {   
 			 });
			  
			  } 
		  
		 self.setFilter = function(data, event) {			 
        var id = event.target.id;
		if ($("input#"+id).is(":checked")) {			
			 $(".toolsrow").hide();
			$("."+self.currentRole()+"."+self.currentCategory()).show();	
		}
			else{
				
	 	}
        return true;
      } 
	  
	  edittools = function (course) {
               
                    $("#edittools").ojDialog("open");
                }
				
		//  DELETE A COURSE POST CONFIRMATION
            deletetools = function (coursedata) {
                if (confirm("Do you really wish to delete the course?")) {

                    var course = new Array();
                   
                    console.log("Deleting tools. . . ");
                    
                }

            }		
				
				getCategoryHierarchy = function () {
                $.getJSON(trainingbaseurl + "getCategories").
                then(function (response) {
                    var categoriesres = response.categories;
                    self.categoryForUi([]);
                    if (categoriesres.length > 0) {
                        processCategoryList(categoriesres, self.categoryForUi());
                    }
                     console.log(ko.toJSON(self.categoryForUi()));
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
			
			 openEditToolsDescriptionModal = function () {

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
                    $("#edit_tools_desc_modal").ojDialog("open");
                                   
            }  
			
			self.createtools = function () {
                

                $("#createtools").ojDialog("open");
            }
			
	   getCategoryHierarchy();
        }
        return new DashboardViewModel();
    }
);
