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
                checkadminrights();
                setuncheck('category');
                setuncheck('roles');
                alltools(false,null);
            };

            /******************************************LEFT PANEL DATA RECORDED STARTS***************************************************************/
            
            refineupdate = function (desc) 
            {//console.log(desc.alt);
                var type = desc.name;
                if (desc.checked) 
                {
                    switch (type) 
                    {
                        case "category":
                            desc.checked = true;
                            self.refinecategories.removeAll();
                            self.refinecategories.push(desc.defaultValue);
                            break;

                        case "roles":
                            desc.checked = true;
                            self.refineroles.removeAll();
                            self.refineroles.push(desc.defaultValue);
                            break;
                    }
                }
                else 
                {
                    switch (type) 
                    {
                        case "category":
                            self.refinecategories.remove(desc.defaultValue);
                            break;

                        case "roles":
                            self.refineroles.remove(desc.defaultValue);
                            break;
                    }
                }
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
                var selected_roles_alt = new Array();
                var selected_categories_alt = new Array();
                $("input:checkbox[name=roles]:checked").each(function () {
                    selected_roles_refine.push($(this).val());
                    selected_roles_alt.push($(this).attr("alt").replace('[', '').replace(']', '').replace(/"/g, '').replace(/,/g, ''));
                });
                $("input:checkbox[name=category]:checked").each(function () {
                    selected_categories_refine.push($(this).val());
                    selected_categories_alt.push(($(this).attr("alt")).replace('[', '').replace(']', '').replace(/"/g, '').replace(/,/g, ''));
                });
                console.log("roles--" + selected_roles_alt);
                console.log("cats--" + selected_categories_alt);// var text = self.freetext().length > 0 ? self.freetext() : '';
                if (selected_roles_refine && selected_categories_refine) {
                    searchanalytics(self.freetext(), '', selected_roles_alt, selected_categories_alt, 'TNR');
                }
                else if (selected_roles_refine) {
                    searchanalytics(self.freetext(), '', selected_roles_alt, '', 'TNR');
                }
                else if (refinetrcategories) {
                    searchanalytics(self.freetext(), '', '', selected_categories_alt, 'TNR');
                }
                // console.log(self.freetext()[0]);
                if ((selected_categories_refine == 0 || selected_categories_refine == "") && (selected_roles_refine == 0 || selected_roles_refine == "")) {
                    var headerobj = {
                        categoryid: "",
                        roleid: "",
                        freetext: self.freetext()[0]
                    }
                }
                else if ((selected_categories_refine == 0 || selected_categories_refine == "") && (selected_roles_refine > 0 || selected_roles_refine != "")) {
                    var headerobj = {
                        categoryid: "",
                        roleid: selected_roles_refine,
                        freetext: self.freetext()[0]
                    }
                }
                else if ((selected_categories_refine > 0 || selected_categories_refine != "") && (selected_roles_refine == 0 || selected_roles_refine == "")) {
                    var headerobj = {
                        categoryid: selected_categories_refine,
                        roleid: "",
                        freetext: self.freetext()[0]
                    }
                }
                else {
                    var headerobj = {
                        categoryid: selected_categories_refine,
                        roleid: selected_roles_refine,
                        freetext: self.freetext()[0]
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
                    {//console.log(allcourses);
                        self.cat(allcourses);
                        for (var w = 0; w < allcourses.length; w++) 
                        {
                            self.expand.push(allcourses[w].name);
                        }
                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log(err);
                });
                // for (var w = 0; w < self.expand().length; w++) {
                //     $("#" + self.expand()[w]).ojCollapsible({ "expanded": false });
                // }
                // alltools(true, self.cat());
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

            setuncheck = function (classname) 
            {
                var x = document.getElementsByClassName(classname);
                for (var i = 0; i < x.length; i++) {
                    x[i].checked = false;
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
                    var rolist = reasons.roles;
                    for (var i = 0; i < rolist.length; i++) {
                        self.roles.push({
                            id: i,
                            name: rolist[i].name
                        })
                    }
                });

                $.getJSON("http://solutionengineering-devops.us.oracle.com:8080/tools/filters").then(function (response) {

                    // CATEGORIES
                    self.refinelist([]);
                    for (var j = 0; j < response.typesList.length; j++) {
                        self.refinelist.push({
                            id: response.typesList[j].id,
                            name: response.typesList[j].name
                        })
                    }
                });
            }
            getLeftpanelData();

            self.resetCourseFilters = function () {
                setuncheck('category');
                setuncheck('roles');
                self.freetext([]);
                alltools(false, null);
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
                        self.showToastDialog("Link created successfully!", 2000);
                    }
                }).fail(function (xhr, textStatus, err) {
                    closetools();
                    self.showToastDialog("Link creation failed!", 0);
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
                        for (var w = 0; w < self.expand().length; w++) {
                            $("#" + self.expand()[w]).ojCollapsible({ "expanded": false });
                        }
                        alltools(true, editcat);
                        self.showToastDialog("Link updated successfully!", 2000);
                    }
                }).fail(function (xhr, textStatus, err) {
                    closeedittools();
                    self.showToastDialog("Link updation failed!", 0);
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
                            self.showToastDialog("Link deleted successfully!", 2000);
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

            /******************************************ANALYTICS START************************************************************************************/

            searchanalytics = function (searchtext, cities, roles, categories, calltype) 
            {
                var searchanalytics = {
                    "SESSION_ID": sessionid,
                    "SEARCH_TEXT": searchtext,
                    "CITIES": cities,
                    "ROLES": roles.toString(),
                    "CATEGORIES": categories.toString(),
                    "CALL_TYPE": calltype,
                    "USER_EMAIL": ssoemail
                };
                console.log(searchanalytics);
                $.ajax({
                    url: homebaseurl + 'POST_EVENT_SEARCH',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: ko.toJSON(searchanalytics),
                    success: function (event) {
                        console.log("Analytics of search event sent.", event);
                    }
                }).fail(function (xhr, textStatus, err) {
                    console.log("Error in sending search event analytics", err);
                });
                return true;
            }

            analytics = function (itemtitle, itemname, itemtype, itemlevel1, itemlevel2, itemlevel3) 
            {
                if (ssoemail == "") {
                    ssoemail = "test@oracle.com";
                }
                var itemdesc = itemtitle + " from category : " + itemname;
                var analytics = {
                    "session_id": sessionid,
                    "email": ssoemail,
                    "event_description": itemdesc,
                    "event_type": itemtype,
                    "level_1": itemlevel1,
                    "level_2": itemlevel2,
                    "level_3": itemlevel3
                };
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

            /******************************************ANALYTICS ENDS************************************************************************************/
        }
        return new DashboardViewModel();
    }
);