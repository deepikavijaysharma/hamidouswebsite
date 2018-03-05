define([
  'ojs/ojcore',
  'knockout',
  'jquery',
  'ojs/ojknockout',
  'ojs/ojtabs',
  'ojs/ojconveyorbelt',
  'ojs/ojradioset',
  'ojs/ojbutton',
  'ojs/ojselectcombobox',
  'ojs/ojdatetimepicker',
  'ojs/ojtimezonedata',
  'ojs/ojtagcloud',
  'ojs/ojtoolbar',
  'ojs/ojchart'
], function (oj, ko, $) {

  function tabmodel() {
    var self = this;
    self.period = ko.observable(["0"]);
    self.formState = ko.observable('enabled');

    self.disableFormControls = ko.computed(function () {

      if (self.period() == '-1') 
        return false;
      else 
        return true;
      }
    );

    // Filter Variables
    self.start_date = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(Date.now())));
    self.end_date = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(Date.now())));
    self.value = ko.observable();
    var today = new Date(Date.now());

    // Row One Variables
    self.total_visitor = ko.observable(0);
    self.total_unique_visitor = ko.observable(0);
    self.total_returning_visitor = ko.observable(0);
    self.total_course_registration = ko.observable(0);

    var total_visitor_url = analytics_report_base_url + "VISITS/"; ///$-$/01-jan-2018/01-mar-2018"
    var total_new_visitor_url = analytics_report_base_url + "UNIQ_USERS/"; //$-$/01-jan-2018/01-mar-2018";
    var total_returning_visitor_url = analytics_report_base_url + "RETURNING_USERS/"; //$-$/01-jan-2018/01-mar-2018";
    var total_course_enrollment_url = analytics_report_base_url + "ENROLLMENTS/"; //$-$/01-jan-2018/01-mar-2018";
    var course_enrollment_trend_url = analytics_report_base_url + "ENROLLMENTS_TOP5/";

    // BAR GRAPH DATA

    self.stackValue = ko.observable('off');
    self.orientationValue = ko.observable('vertical');
    self.locationValue = ko.observable('back');
    self.refObjTypeValue = ko.observable('line');
    self.refObjItemsTypeValue = ko.observable('constant');
    self.axisValue = ko.observable('yAxis');
    self.barSeriesValue = ko.observableArray([]);
    self.barGroupsValue = ko.observableArray([]);


    // CONVERTS ANY DATE OBJECT INTO dd-MMM-yyyy format
    getDateString = function (date) {

      var day_of_the_date = date
        .toDateString()
        .split(' ')[2];
      var month_of_the_date = date
        .toDateString()
        .split(' ')[1]
        .toLowerCase();
      var year_of_the_date = date
        .toDateString()
        .split(' ')[3];
      return day_of_the_date + "-" + month_of_the_date + "-" + year_of_the_date;
    }

    // GET TOTAL VISITOR COUNT
    async function getTotalVisitorCount(period, startdate, enddate) {

      var url = total_visitor_url;

      // ADD PERIOD IF SELECTED
      url += period.length > 0
        ? period + "/"
        : "$-$/";

      // ADD START DATE IF SELECTED
      url += startdate.length > 0
        ? startdate + "/"
        : "$-$/";

      // ADD END DATE IF SELECTED
      url += enddate.length > 0
        ? enddate
        : "$-$";

      $
        .getJSON(url)
        .then(function (data) {
          self.total_visitor(data.items[0].count);
        });
    }

    // GET NEW VISITOR COUNT
    async function getNewVisitorCount(period, startdate, enddate) {

      var url = total_new_visitor_url;

      // ADD PERIOD IF SELECTED
      url += period.length > 0
        ? period + "/"
        : "$-$/";

      // ADD START DATE IF SELECTED
      url += startdate.length > 0
        ? startdate + "/"
        : "$-$/";

      // ADD END DATE IF SELECTED
      url += enddate.length > 0
        ? enddate
        : "$-$";

      $
        .getJSON(url)
        .then(function (data) {
          self.total_unique_visitor(data.items[0].count);
        });
    }

    // GET NEW VISITOR COUNT
    async function getReturningVisitorCount(period, startdate, enddate) {

      var url = total_returning_visitor_url;

      // ADD PERIOD IF SELECTED
      url += period.length > 0
        ? period + "/"
        : "$-$/";

      // ADD START DATE IF SELECTED
      url += startdate.length > 0
        ? startdate + "/"
        : "$-$/";

      // ADD END DATE IF SELECTED
      url += enddate.length > 0
        ? enddate
        : "$-$";

      $
        .getJSON(url)
        .then(function (data) {
          self.total_returning_visitor(data.items[0].count);
        });
    }

    // GET NEW VISITOR COUNT
    async function getCourseEnrollmentCount(period, startdate, enddate) {

      var url = total_course_enrollment_url;

      // ADD PERIOD IF SELECTED
      url += period.length > 0
        ? period + "/"
        : "$-$/";

      // ADD START DATE IF SELECTED
      url += startdate.length > 0
        ? startdate + "/"
        : "$-$/";

      // ADD END DATE IF SELECTED
      url += enddate.length > 0
        ? enddate
        : "$-$";

      $
        .getJSON(url)
        .then(function (data) {
          self.total_course_registration(data.items[0].count);
        });
    }

    async function getCourseEnrollmentTremd(period, startdate, enddate) {
      var url = course_enrollment_trend_url;

      // ADD PERIOD IF SELECTED
      url += period.length > 0
        ? period + "/"
        : "$-$/";

      // ADD START DATE IF SELECTED
      url += startdate.length > 0
        ? startdate + "/"
        : "$-$/";

      // ADD END DATE IF SELECTED
      url += enddate.length > 0
        ? enddate
        : "$-$";

      $
        .getJSON(url)
        .then(function (data) {
          console.log(data.items);
          var countval = new Array();
          self.barGroupsValue([]);
          self.barSeriesValue([]);
          for (var i = 0; i < data.items.length; i++) {
            countval.push(data.items[i].count);
            self
              .barGroupsValue
              .push(data.items[i].name);
          }

          self
            .barSeriesValue
            .push({name: "Courses", items: countval})
        });

    }

    // Load all data once page is loaded
    self.handleActivated = function (info) {
      getTotalVisitorCount("Week", "", "");
      getNewVisitorCount("Week", "", "");
      getReturningVisitorCount("Week", "", "");
      getCourseEnrollmentCount("Week", "", "");
      getCourseEnrollmentTremd("Week", "", "");
    }

    // Filter Button Handler
    applyFilter = function () {

      if (self.period()=='-1'&& (new Date(self.start_date()) >= new Date(self.end_date()))) {
        alert("End Date should be greater than Start Date");
        return;
      }

      var period = self.period() != '-1'
        ? self.period()
        : "";
      var startdate = self.period() != '-1'
        ? ""
        : getDateString(new Date(self.start_date()));
      var enddate = self.period() != '-1'
        ? ""
        : getDateString(new Date(self.end_date()));

      console.log('Start: ' + startdate);
      console.log('End: ' + enddate);
      console.log('Period: ' + period);

      getTotalVisitorCount(period, startdate, enddate);
      getNewVisitorCount(period, startdate, enddate);
      getReturningVisitorCount(period, startdate, enddate);
      getCourseEnrollmentCount(period, startdate, enddate);
      getCourseEnrollmentTremd(period, startdate, enddate);
    }


  }
  return new tabmodel();
});
