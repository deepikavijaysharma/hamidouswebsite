/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojaccordion', 'ojs/ojcollapsible', 'ojs/ojmodule', 'ojs/ojmoduleanimations', 'ojs/ojanimation','ojs/ojdialog', 'ojs/ojbutton','ojs/ojinputtext','ojs/ojtree','ojs/ojselectcombobox'],
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
            this.val = ko.observableArray(["CH"]); 
            //DISPLAY TOOLS CONTENTS
            self.cat = ko.observableArray([]);

            //VARIABLES FOR FILTERING 
            self.refinecategories = ko.observableArray([]);
            self.refineroles = ko.observableArray([]);
            // self.refinecategories.push(0); 
            // self.refineroles.push(0); 
            self.selectedcategories = ko.observableArray([]);
            self.expand = ko.observableArray([]);

            //  VARIABLES FOR LEFT PANEL CATEGORIES 
            self.refinelist = ko.observableArray([]);
            self.roles = ko.observableArray([]);

            //ADD Tools observables
            self.toolsid = ko.observable('');
            self.toolstitle = ko.observable('');
            self.toolslink = ko.observable('');
            self.toolsrolesel = ko.observableArray([]);
            self.toolscategorysel = ko.observableArray([]);
            self.toolsdescription = ko.observable('');

            //EDIT Tools observables
            self.edittoolsid = ko.observable('');
            self.edittoolstitle = ko.observable('');
            self.edittoolslink = ko.observable('');
            self.edittoolsrolesel = ko.observableArray([]);
            self.edittoolscategorysel = ko.observableArray([]);
            self.edittoolscategoryselname = ko.observableArray([]);
            self.edittoolsdescription = ko.observable('');

            // TOAST MESSAGE DIALOG
            self.msg = ko.observable("");

            //SEARCH TEXT
            self.freetext = ko.observable("");
            
            // CHECK FOR ADMIN RIGHTS
            checkadminrights = function () {
                console.log('admin checked');
                if (isAdmin) {
                    console.log("Showing for admin");
                    $(".admin").css("display", "inline-block");

                } else {
                    console.log("Hiding from user");
                    var appBanners = document.getElementsByClassName('admin'), i;

                    for (var i = 0; i < appBanners.length; i++) {
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
                    isAdmin = false;
                    checkadminrights();
                }
            }

            self.handleAttached = function (info) {
                setcheck("category", "roles");
                alltools(false,null);
            };

            /******************************************LEFT PANEL DATA RECORDED STARTS***************************************************************/
            
            refineupdate = function (desc) 
            {
                // console.log(desc.checked);
                // if (self.refineroles() == "")
                // {
                //     var x = document.getElementsByClassName(roleclassname);
                //     x[0].checked = true;
                // }
                // else if (self.refinecategories() == "") {
                //     var y = document.getElementsByClassName(roleclassname);
                //     x[0].checked = true;
                // }
                // setcheck("category","roles");
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
                            // console.log(desc.defaultValue);
                            if (desc.defaultValue == 0)
                            {
                                setuncheck('category',0);
                            }
                            else{
                                setuncheck('category', null);
                            }
                            break;

                        case "roles":
                            // setuncheck('roles');
                            desc.checked = true;
                            self.refineroles.removeAll();
                            self.refineroles.push(desc.defaultValue);
                            // console.log(desc.defaultValue);
                            if (desc.defaultValue == 0) {
                                setuncheck('roles', 0);
                            }
                            else {
                                setuncheck('roles', null);
                            }
                            break;
                    }
                } 
                // else 
                // {
                //     alltools(false,null);
                // }
                else 
                {
                    switch (type) 
                    {
                        case "category":
                            self.refinecategories.remove(desc.defaultValue);
                            if (desc.defaultValue == 0) {
                                setuncheck('category', 0);
                            }
                            else {
                                setuncheck('category', null);
                            }
                            break;

                        case "roles":
                            self.refineroles.remove(desc.defaultValue);
                            if (desc.defaultValue == 0) {
                                setuncheck('roles', 0);
                            }
                            else {
                                setuncheck('roles', null);
                            }
                            break;
                    }
                }
                console.log(self.refinecategories());
                console.log(self.refineroles());
                // if (((self.refinecategories() == "") && (self.refineroles() == "")) || (self.refinecategories() == "") || (self.refineroles() == ""))
                // {
                //     setcheck("category","roles");
                // }
            }

            /******************************************LEFT PANEL DATA RECORDED ENDS***************************************************************/


            /******************************************DEFAULT FILTER STARTS***********************************************************************/

            alltools = function (istrue, catarray)
            {
                var headerobj = {
                    categoryid: "",
                    roleid: "",
                    freetext: ""
                }
                $.ajax({
                    url: "http://solutionengineering-devops.us.oracle.com:8080/tools/contents/find",
                    cache: false,
                    type: 'GET',
                    headers: headerobj,
                    contentType: 'application/json; charset=utf-8',
                    success: function (allcourses) 
                    {
                        self.cat(allcourses);
                        // console.log(self.cat()[0].name);
                        if(istrue){
                            for (var w = 0; w < catarray.length; w++) {
                                $("#" + self.expand()[w]).ojCollapsible({ "expanded": true });
                            }
                            for (var w = 0; w < allcourses.length; w++) {
                                self.expand.push(allcourses[w].name);
                            }
                        }
                        else
                        {
                            for (var w = 0; w < allcourses.length; w++) 
                            {
                                self.expand.push(allcourses[w].name);
                            }
                        }
                    },
                    error: function (xhr) {
                        console.log(xhr);
                    }
                });
            }

            /******************************************DEFAULT FILTER ENDS***************************************************************/


            /******************************************FILTER STARTS***********************************************************************/

            self.refinetools = function () 
            {
                var selected_roles_refine = new Array();
                var selected_categories_refine = new Array();
                $("input:checkbox[name=roles]:checked").each(function () {
                    selected_roles_refine.push($(this).val());
                });
                $("input:checkbox[name=category]:checked").each(function () {
                    selected_categories_refine.push($(this).val());
                });
                console.log("roles--" + selected_roles_refine);
                console.log("cats--" + selected_categories_refine);
                var text = self.freetext().length > 0 ? self.freetext() : '';
                self.selectedcategories([]);
                var selectedcategories = ko.toJSON(self.refinecategories()).replace('[', '').replace(']', '').replace(/"/g, '');
                var selectedroles = ko.toJSON(self.refineroles()).replace('[', '').replace(']', '').replace(/"/g, '');
                if ((selected_categories_refine == 0 || selected_categories_refine == "") && (selected_roles_refine == 0 || selected_roles_refine == "")) {
                    var headerobj = {
                        categoryid: "",
                        roleid: "",
                        freetext: self.freetext()
                    }
                }
                else if ((selected_categories_refine == 0 || selected_categories_refine == "") && (selected_roles_refine > 0 || selected_roles_refine != "")) {
                    var headerobj = {
                        categoryid: "",
                        roleid: selected_roles_refine,
                        freetext: self.freetext()
                    }
                }
                else if ((selected_categories_refine > 0 || selected_categories_refine != "") && (selected_roles_refine == 0 || selected_roles_refine == "")) {
                    var headerobj = {
                        categoryid: selected_categories_refine,
                        roleid: "",
                        freetext: self.freetext()
                    }
                }
                else {
                    var headerobj = {
                        categoryid: selected_categories_refine,
                        roleid: selected_roles_refine,
                        freetext: self.freetext()
                    }
                }
                console.log(headerobj);
                $.ajax({
                    url: "http://solutionengineering-devops.us.oracle.com:8080/tools/contents/find",
                    cache: false,
                    type: 'GET',
                    headers: headerobj,
                    contentType: 'application/json; charset=utf-8',
                    success: function (allcourses) 
                    {
                        console.log(allcourses);
                        self.cat(allcourses);
                        for (var w = 0; w < allcourses.length; w++) 
                        {
                            self.expand.push(allcourses[w].name);
                        }
                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log(err);
                });
            }

            /******************************************FILTER ENDS**************************************************************************/

            self.expandall = function () 
            {
                for (var w = 0; w < self.expand().length; w++) 
                {
                    $("#" + self.expand()[w]).ojCollapsible({ "expanded": true });
                }
            }

            self.closeall = function () 
            {
                for (var w = 0; w < self.expand().length; w++) 
                {
                    $("#" + self.expand()[w]).ojCollapsible({ "expanded": false });
                }
            }

            setuncheck = function (classname,itemid) 
            {
                var x = document.getElementsByClassName(classname);
                if (itemid == 0)
                {
                    for (var i = itemid+1; i < x.length; i++) {
                        x[i].checked = false;
                    }
                }
                else{
                     x[0].checked = false;
                }
            }
            

            setcheck = function (roleclassname, categoryclassname) {
                var x = document.getElementsByClassName(roleclassname);
                var y = document.getElementsByClassName(categoryclassname);
                // if (self.refineroles() == "") {
                //     x[0].checked = true;
                // }
                // else if (self.refinecategories() == "") {
                //     y[0].checked = true;
                // }
                // else if ((self.refineroles() == "") && (self.refinecategories() == "")) {
                //     x[0].checked = true;
                //     y[0].checked = true;
                // }
                // x[0].checked = true;
                // y[0].checked = true;
                for (var i = 1; i < x.length; i++) {
                    x[0].checked = true;
                    x[i].checked = false;
                }
                for (var j = 1; j < y.length; j++) {
                    y[0].checked = true;
                    y[j].checked = false;
                }
            }

            self.showToastDialog = function (msg, timeinmillisec) {
                self.msg(msg);
                $("#toastdiv").ojDialog("open");
                if (timeinmillisec > 0) {
                    setTimeout(function () {
                        $("#toastdiv").ojDialog("close");
                    }, timeinmillisec);
                }
            }

            /******************************************LEFT PANEL DATA STARTS***************************************************************/

            getLeftpanelData = function () 
            {
                $.getJSON(trainingbaseurl + "getFiltersV2").then(function (reasons) {

                    // ROLES
                    self.roles([]);
                    self.roles.push({
                        id: '0',
                        name: 'All'
                    })
                    var rolist = reasons.roles;
                    for (var i = 0; i < rolist.length; i++) {
                        self.roles.push({
                            id: rolist[i].id,
                            name: rolist[i].name
                        })
                    }
                });

                $.getJSON("http://solutionengineering-devops.us.oracle.com:8080/tools/filters").then(function (response) {
                    // ROLES
                    // self.roles([]);
                    // self.roles.push({
                    //     id: '0',
                    //     name: 'All'
                    // })
                    
                    // for (var i = 0; i < response.rolesList.length; i++) {
                    //     self.roles.push({
                    //         id: response.rolesList[i].id,
                    //         name: response.rolesList[i].role
                    //     })
                    // }
                    // CATEGORIES
                    self.refinelist([]);
                    self.refinelist.push({
                        id: '0',
                        name: 'All'
                    })
                    for (var j = 0; j < response.typesList.length; j++) {
                        self.refinelist.push({
                            id: response.typesList[j].id,
                            name: response.typesList[j].name
                        })
                    }
                    setcheck("roles", "category");
                });
            }
            getLeftpanelData();

            self.resetCourseFilters = function () {
                // setuncheck('category');
                // setuncheck('roles');
                // self.refinecategories([]);
                // self.refineroles([]);
                // setcheck("roles","category");
                getLeftpanelData();
            }

            /******************************************LEFT PANEL DATA ENDS*************************************************************************/

            /******************************************ADD TOOLS AND RESOURCES STARTS***************************************************************/

            self.addtools = function () 
            {
                self.toolsrolesel([]);
                self.toolscategorysel([]);
                self.toolstitle('');
                self.toolslink('');
                self.toolsdescription('');
                $("#createtools").ojDialog("open");
            }

            createtools = function () 
            {
                if (self.toolstitle().length == 0) {
                    alert("Please enter Title");
                    return;
                }
                if (self.toolslink().length == 0) {
                    alert("Please enter Link");
                    return;
                }
                if (self.toolsrolesel().length == 0) {
                    alert("Please select role");
                }
                if (self.toolscategorysel().length == 0) {
                    alert("Please select category");
                }
                if (self.toolsdescription().length == 0) {
                    alert("Please enter description");
                    return;
                }

                var addtoolsdata = {
                    name: self.toolstitle(),
                    description: self.toolsdescription(),
                    link: self.toolslink(),
                    mappedRolesIds: ko.toJSON(self.toolsrolesel()).replace('[', '').replace(']', '').replace(/"/g, ''),
                    mappedCategoryIds: ko.toJSON(self.toolscategorysel()).replace('[', '').replace(']', '').replace(/"/g, '')
                }

                console.log("create tools : " + ko.toJSON(addtoolsdata));
                $.ajax({
                    url: "http://solutionengineering-devops.us.oracle.com:8080/tools/contents",
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(addtoolsdata),
                    success: function (data) {
                        closetools();
                        alltools(true, self.toolscategorysel());
                        self.showToastDialog("Tools created successfully!", 2000);
                    }
                }).fail(function (xhr, textStatus, err) {
                    closetools();
                    self.showToastDialog("Tools creation failed!", 0);
                });
            }           
            
            resettools = function () 
            {
                self.toolstitle('');
                self.toolslink('');
                self.toolsdescription('');
                self.toolsrolesel([]);
                self.toolscategorysel([]);
                self.edittoolstitle('');
                self.edittoolslink('');
                self.edittoolsdescription('');
                self.edittoolsrolesel([]);
                self.edittoolscategorysel([]);
            }

            closetools = function () 
            {
                $("#createtools").ojDialog("close");
            }

            /******************************************ADD TOOLS AND RESOURCES ENDS***************************************************************/

            /******************************************UPDATE TOOLS AND RESOURCES STARTS*****************************************************************/

            edittools = function (upd) 
            {
                console.log(upd);
                self.edittoolsrolesel([]);
                self.edittoolscategorysel([]);
                self.edittoolsid('');
                self.edittoolstitle('');
                self.edittoolslink('');
                self.edittoolsdescription('');
                self.edittoolscategoryselname([]);

                // SET NEW VALUES
                self.edittoolsid(upd.id);
                self.edittoolstitle(upd.name);
                self.edittoolslink(upd.link);
                // self.edittoolscategoryselname([]);
                for (var a = 0; a < upd.mappedRolesIds.length; a++) 
                {
                    self.edittoolsrolesel.push(upd.mappedRolesIds[a].replace('[', '').replace(']', '').replace(/"/g, '').replace(/,/g, ''));
                }
                for (var b = 0; b < upd.mappedCategoryIds.length; b++) 
                {
                    self.edittoolscategorysel.push(upd.mappedCategoryIds[b].replace('[', '').replace(']', '').replace(/"/g, '').replace(/,/g, ''));
                }
                self.edittoolsdescription(upd.description);
                $("#edittools").ojDialog("open");
            }

            without = function (array, what) {
                return array.filter(function (element) {
                    return element !== what;
                });
            }
            
            updatetools = function (edit_org, param2) 
            {
                if (self.edittoolstitle().length == 0) {
                    alert("Please enter Title");
                    return;
                }
                if (self.edittoolslink().length == 0) {
                    alert("Please enter Link");
                    return;
                }
                if (self.edittoolsrolesel().length == 0) {
                    alert("Please select role");
                }
                if (self.edittoolscategorysel().length == 0) {
                    alert("Please select category");
                }
                if (self.edittoolsdescription().length == 0) {
                    alert("Please enter description");
                    return;
                }

                var updatetoolsdata = {
                    id: self.edittoolsid(),
                    name: self.edittoolstitle(),
                    description: self.edittoolsdescription(),
                    link: self.edittoolslink(),
                    mappedRolesIds: without(self.edittoolsrolesel(), "").toString(),
                    mappedCategoryIds: without(self.edittoolscategorysel(), "").toString()
                }

                console.log("update tools : " + ko.toJSON(updatetoolsdata));
                $.ajax({
                    url: "http://solutionengineering-devops.us.oracle.com:8080/tools/contents",
                    cache: false,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(updatetoolsdata),
                    success: function (data) {
                        closeedittools();
                        var editcat = without(self.edittoolscategorysel(), "").toString();
                        console.log(editcat);
                        // var editcat = self.edittoolscategorysel();
                        // var editcatarray = JSON.parse("[" + self.edittoolscategorysel() + "]");
                        for (var w = 0; w < self.expand().length; w++) {
                            $("#" + self.expand()[w]).ojCollapsible({ "expanded": false });
                        }
                        alltools(true, editcat);
                        self.showToastDialog("Tools updated successfully!", 2000);
                    }
                }).fail(function (xhr, textStatus, err) {
                    closeedittools();
                    self.showToastDialog("Tools updation failed!", 0);
                });
            }

            closeedittools = function () 
            {
                $("#edittools").ojDialog("close");
            }

            /******************************************UPDATE TOOLS AND RESOURCES ENDS***************************************************************/

            /******************************************DELETE TOOLS AND RESOURCES STARTS********************************************************************/

            deletetools = function (deltools) 
            {
                opendeletetools(deltools);
            }

            opendeletetools = function (contentid) 
            {
                if(contentid == undefined)return;
                var str = contentid.id;
                console.log("deleting id tools - " + str);
                $("#deletetools").ojDialog("open");
                $("#delete_tools").click(function () 
                {
                    $.ajax({
                        url: "http://solutionengineering-devops.us.oracle.com:8080/tools/contents/" + str,
                        method: 'DELETE',
                        contentType: 'application/json; charset=utf-8',
                        success: function () {
                            closedeltools();
                            alltools(false,null);
                            self.showToastDialog("Tools deleted successfully!", 2000);
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
    
            closedeltools = function () 
            {
                $("#deletetools").ojDialog("close");
            }

            /******************************************DELETE TOOLS AND RESOURCES ENDS********************************************************************/

        }
        return new DashboardViewModel();
    }
);