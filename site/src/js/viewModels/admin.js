define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojconveyorbelt', 'ojs/ojbutton', 'ojs/ojselectcombobox', 'ojs/ojinputtext'],
  function (oj, ko, $) {
    function createcoursemodel() {
      var self = this;

      // CREATE COURSE
      self.coursetitle = ko.observable('');
      self.courselink = ko.observable('');
      self.coursedesc = ko.observable('');

      self.selectedrole = ko.observable('');
      self.selectedcategory = ko.observable('');
      self.selectedsubcategory = ko.observable('');

      self.roles = ko.observableArray([]);
      self.categories = ko.observableArray([]);
      self.subcategories = ko.observableArray([]);

      self.rolebasedcategory = ko.observableArray([]);
      self.categorybasedsubcategory = ko.observableArray([]);
      self.isAdvanced = ko.observableArray([]);



      // CREATE CATEGORY
      self.role = ko.observable('');
      self.category = ko.observable('');
      self.subcategory = ko.observable('');

      // CREATE COMMUNITY CALL
      self.calltitle = ko.observable('');
      self.callspkr = ko.observable('');
      self.calldesignation = ko.observable('');
      self.value = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
      self.callsdate = ko.observable('');
      self.calltime = ko.observable('');
      self.callvenue = ko.observable('');
      self.calllink = ko.observable('');
      self.calldialin = ko.observable('');
      self.calldesc = ko.observable('');






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
      this.patternValue = ko.observableArray(["dd-MMM-yy hh:mm:ss a Z"]);
      this.dateTimeConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
      createConverter({
        pattern: "dd-MMM-yy hh:mm:ss a Z"
      });
      self.callname = ko.observable('');
      self.callspkr = ko.observable('');
      self.calldesignation = ko.observable('');
      self.value = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
      self.callsdate = ko.observable('');
      self.calltime = ko.observable('');
      self.callvenue = ko.observable('');
      self.calllink = ko.observable('');
      self.calldialin = ko.observable('');
      self.calldesc = ko.observable('');

      resetcall = function () {
        self.callname('');
        self.callspkr('');
        self.calldesignation('');
        self.value(oj.IntlConverterUtils.dateToLocalIso(new Date()));
        self.callsdate('');
        self.calltime('');
        self.callvenue('');
        self.calllink('');
        self.calldialin('');
        self.calldesc('');
      }

      // CREATE COMMUNITY CALL
      createcommunitycall = function () {

        if (self.calltitle().length == 0) {
          alert("Please enter Title");
          return;
        }

        if (self.callspkr().length == 0) {
          alert("Please enter name of the speaker");
          return;
        }

        if (self.calldesignation().length == 0) {

          alert("Please enter designation of the speaker");
          return;
        }

        if (self.callvenue().length == 0) {

          alert("Please enter venue details");
          return;
        }

        if (self.calllink().length == 0) {

          alert("Please enter meeting link");
          return;
        }

        if (self.calldialin().length == 0) {

          alert("Please enter Dial In details");
          return;
        }

        if (self.calldesc().length == 0) {

          alert("Please enter description");
          return;
        }

        var call = {
          name: self.callname(),
          speaker: self.callspkr(),
          title: self.calldesignation(),
          call_date: self.value().split('T')[0],
          call_time: self.value().split('T')[1],
          locn: self.callvenue(),
          meetinglink: self.calllink(),
          dialin: self.calldialin(),
          description: self.calldesc(),
          user: "angan.sen@oracle.com"
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
          }
        }).fail(function (xhr, textStatus, err) {
          alert(err);
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

      getcategories();

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

        console.log(ko.toJSON(catagory));

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
          alert(err);
        });

      }


    }

    return new createcoursemodel();
  });