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

    self.training_requested_array=ko.observableArray([]);

    //  URLS
    var top_requested_training_url = analytics_report_base_url + "TRAINING_REQUEST/";
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
    async function getRequestedTrainingCount(period, startdate, enddate) {

      var url = top_requested_training_url;

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
          self.training_requested_array([]);
          for (var i = 0; i < data.items.length; i++) {
          
            var req_per_role=data.items[i].request;
            req_per_role=req_per_role.replace(/{/g,"").replace(/}/g,"").replace(/role:/g,"").split(",");
            self
              .training_requested_array
              .push({
                category:data.items[i].category,
                request:req_per_role,
                total:data.items[i].total,
              });
          }

          console.log(ko.toJSON(self.training_requested_array));
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

      getRequestedTrainingCount(period, startdate, enddate);

    }

    // Load all data once page is loaded
    self.handleActivated = function (info) {
      getRequestedTrainingCount("Week", "", "");
    }

  }
  return new tabmodel();
});