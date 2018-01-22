/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
      var self = this;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /* bar graph variables */
      self.serieslist = ko.observableArray([]);
      self.seriestoptenulist = ko.observableArray([]);
      self.seriestoptenilist = ko.observableArray([]);
      self.stackValue = ko.observable('on');
      self.stackLabelValue = ko.observable('on');
      self.orientationValue = ko.observable('horizontal');
      self.labelPosition = ko.observable('auto');

      self.barGapRatio = ko.observable(0.9);
      self.barGapRatio1 = ko.observable(0.7);
      self.maxBarWidth = ko.observable();

      self.color1 = ko.observable('#E50000');
      self.borderColor1 = ko.observable('#E50000');
      self.color2 = ko.observable('#8BB4CA');
      self.borderColor2 = ko.observable('#8BB4CA');

      self.plotAreaColor = ko.observable('rgba(255, 255, 255, 0)');
      self.plotAreaBorderColor = ko.observable('#000000');
      self.plotAreaBorderWidth = ko.observable(0);

      self.plotArea = ko.pureComputed(function () {
        return {
          backgroundColor: self.plotAreaColor(),
          borderColor: self.plotAreaBorderColor(),
          borderWidth: self.plotAreaBorderWidth()
        }
      });

      /* chart axes */
      self.xAxisLineWidth = ko.observable(0);
      self.yMajorTickWidth = ko.observable(0);

      self.xAxis = ko.pureComputed(function () {
        return {
          axisLine: {
            lineWidth: self.xAxisLineWidth()
          }
        };
      });

      self.yAxis = ko.pureComputed(function () {
        return {
          majorTick: {
            lineWidth: self.yMajorTickWidth()
          },
          tickLabel: { 
            rendered: 'off' 
          }
        };
      });

      /* chart data */
      // var series = [{ name: "December", items: [42, 34, 21, 18] },{ name: "January", items: [55, 30, 41, 66] }];
      // var series = [{ name: "December", items: [{ y: 42, label: "42" }, { y: 34, label: "34" }] }, 
      //   { name: "January", items: [{ y: 55, label: "55" }, { y: 30, label: "30" }] }];

      // self.barSeriesValue = ko.computed(function () {
      //   series[0]['color'] = self.color1();
      //   series[0]['borderColor'] = self.borderColor1();
      //   series[1]['color'] = self.color2();
      //   series[1]['borderColor'] = self.borderColor2();
      //   return series;
      // });

      $.getJSON(homebaseurl + 'GetUniqHitsandUsers').then(function (hits) {
        var series;
        self.serieslist([]);
        for (var b = 0; b < hits.items.length; b++) {
          self.serieslist.push({
            name: hits.items[b].month + hits.items[b].year,
            items: [{
              y: hits.items[b].unique_hits,
              label: hits.items[b].unique_hits
            }, {
                y: hits.items[b].unique_users,
                label: hits.items[b].unique_users
              }]
          });
        }
        console.log(hits);
      });
      self.barSeriesValue = ko.computed(function () {
        // self.serieslist[0]['color'] = self.color1();
        // self.serieslist[0]['borderColor'] = self.borderColor1();
        // self.serieslist[1]['color'] = self.color2();
        // self.serieslist[1]['borderColor'] = self.borderColor2();
        return self.serieslist();
      });

      self.barGroupsValue = ["Total Number of Hits", "Total Number of Unique Users"];


      $.getJSON(homebaseurl + 'GetTop10Users_1').then(function (hitsttusers) {
        self.seriestoptenulist([]);
        // for (var b = 0; b < hitsttusers.items.length; b++) {
        //   self.seriestoptenulist.push({
        //     name: hitsttusers.items[b].month + hitsttusers.items[b].year,
        //     items: [{
        //       y: hits.items[b].hits1,
        //       label: hits.items[b].hits1
        //     }, {
        //         y: hits.items[b].hits2,
        //         label: hits.items[b].hits2
        //     }]
        //   });
        //   self.barGroupsValue1.push([hitsttusers.items[b].month]);
        // }
        var emailrec,email,hits;
        console.log(hitsttusers.items);
        // for (var b = 0; b < hitsttusers.items.length; b++) {
        //   emailrec = hitsttusers.items[b].email_hits.split(",");
        //   console.log(emailrec);
        //   email = emailrec.split(":");
        //   console.log(email);
        // }
      });
      // self.barSeriesValue = ko.computed(function () {
      //   // self.serieslist[0]['color'] = self.color1();
      //   // self.serieslist[0]['borderColor'] = self.borderColor1();
      //   // self.serieslist[1]['color'] = self.color2();
      //   // self.serieslist[1]['borderColor'] = self.borderColor2();
      //   return self.serieslist();
      // });

      var series1 = [{ name: "December", items: [{ y: 22, label: "22" }, { y: 31, label: "31" }, { y: 35, label: "35" }, 
        { y: 11, label: "11" }, { y: 36, label: "36" }, { y: 16, label: "16" }, { y: 33, label: "33" }, 
        { y: 8, label: "8" }, { y: 12, label: "12" }, { y: 10, label: "10" }] },
      { name: "January", items: [{ y: 45, label: "45" }, { y: 69, label: "69" }, { y: 39, label: "39" }, { y: 49, label: "49" },
        { y: 41, label: "41" }, { y: 77, label: "77" }, { y: 59, label: "59" }, { y: 36, label: "36" },
        { y: 22, label: "22" }, { y: 23, label: "23" }] }];

      self.barSeriesValue1 = ko.computed(function () {
        series1[0]['color'] = self.color1();
        series1[0]['borderColor'] = self.borderColor1();
        series1[1]['color'] = self.color2();
        series1[1]['borderColor'] = self.borderColor2();
        return series1;
      });

      self.barGroupsValue1 = ["Angan", "Ashritha", "Premraj", "Sakthi", "Aditya", "Chris", "Heather" , "Kaushik", "Gary" , "Maharishi"];


      /* chart style defaults */
      self.styleDefaults = ko.pureComputed(function () {
        return {
          barGapRatio: self.barGapRatio(),
          maxBarWidth: self.maxBarWidth()
        };
      });

      self.styleDefaults1 = ko.pureComputed(function () {
        return {
          barGapRatio: self.barGapRatio1(),
          maxBarWidth: self.maxBarWidth()
        };
      });





    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
