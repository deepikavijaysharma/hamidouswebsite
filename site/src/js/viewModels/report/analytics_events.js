define([
  'ojs/ojcore',
  'knockout',
  'jquery',
  'ojs/ojknockout',
  'ojs/ojbutton',
  'ojs/ojselectcombobox',
  'ojs/ojdatetimepicker',
  'ojs/ojtimezonedata',
  'ojs/ojtable',
  'ojs/ojtabs', 
  'ojs/ojarraytabledatasource'
], function (oj, ko, $) {

  function tabmodel() {
    var self = this;
    self.period = ko.observable(["0"]);
    self.formState = ko.observable('enabled');

    self.link_array=ko.observableArray([]);
    self.details_array=ko.observableArray([]);
    //  URLS
    var top_ten_links_visited = analytics_report_base_url + "LINKS_VIEW_DETAILS/link/";
    var top_ten_detais_visited = analytics_report_base_url + "LINKS_VIEW_DETAILS/View_details/";
    self.disableFormControls = ko.computed(function () {

      if (self.period() == '-1') 
        return false;
      else 
        return true;
      }
    );

    // Filter Variables
    self.start_date = ko.observable();
    self.end_date = ko.observable();
    self.value = ko.observable();
    var today = new Date(Date.now());

    // GET THE TOP 10 LIST OF LINKS VISITED
    async function getTopTenLinkClicked(period, startdate, enddate) {

      var url = top_ten_links_visited;

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
          self.link_array([]);
          for (var i = 0; i < data.items.length; i++) {
            self
              .link_array
              .push({
                name:data.items[i].event_name,
                level:data.items[i].level,
                count:data.items[i].count,
              });
          }

          console.log(ko.toJSON(self.link_array));
        });
    }


     // GET THE TOP 10 LIST OF DETAILS VISITED
     async function getTopTenDetailsClicked(period, startdate, enddate) {

      var url = top_ten_detais_visited;

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
          self.details_array([]);
          for (var i = 0; i < data.items.length; i++) {
            self
              .details_array
              .push({
                name:data.items[i].event_name,
                level:data.items[i].level,
                count:data.items[i].count,
              });
          }

          console.log(ko.toJSON(self.details_array));
        });
    }


    // APPLY FILTER
    applyEventFilter = function () {

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

      getTopTenLinkClicked(period, startdate, enddate);
      getTopTenDetailsClicked(period, startdate, enddate);

    }

    // Load all data once page is loaded
    self.handleActivated = function (info) {
      getTopTenLinkClicked("90", "", "");
      getTopTenDetailsClicked("90", "", "");
    }

  }
  return new tabmodel();
});