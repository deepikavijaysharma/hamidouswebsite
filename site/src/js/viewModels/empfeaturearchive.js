/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojfilmstrip'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
      var self = this;
      self.empfeatlist = ko.observableArray([]);
      self.empdeatils = ko.observable('');
      self.empdeatilsmatched = ko.observableArray([]);

      empf1 = function (id) {
        self.empdeatils(id);
        self.empdeatilsmatched([]);
        for (var b = 0; b < self.empfeatlist().length; b++) {
          if (self.empfeatlist()[b].empfeaid == id) {
            self.empdeatilsmatched.push({
              dempfeaid: self.empfeatlist()[b].empfeaid,
              dempfeatext: self.empfeatlist()[b].empfeatext,
              dempfeaheading: self.empfeatlist()[b].empfeaheading,
              dempfeabg: self.empfeatlist()[b].empfeabg,
              dempfeaarchived: self.empfeatlist()[b].archived
            });//console.log(ko.toJSON(self.empdeatilsmatched));
          }
        }
        $("#empf1").ojDialog("open");
      };

      fetchempfeatures = function () {
        $.getJSON(homebaseurl + 'employee_features').then(function (employeefeaturesdetails) {
          // Fetch Employee features
          self.empfeatlist([]);
          var eflist = employeefeaturesdetails.items;// console.log(eflist);
          for (var b = 0; b < eflist.length; b++) {
            self.empfeatlist.push({
              empfeaid: eflist[b].id,
              empfeaheading: eflist[b].features_heading,
              empfeatext: eflist[b].key_wins_text,
              empfeabg: eflist[b].image,
              empfeaarchived: eflist[b].archived
            })
          }//console.log(ko.toJSON(self.empfeatlist()));
        });
      }
      fetchempfeatures();

      self.pagingModel = null;
      self.pagingModelfeatured = null;
      self.pagingModelwins = null;

      getPagingModelslider = function () {
        if (!self.pagingModel) {
          var filmStrip = $("#filmStrip");
          var pagingModel = filmStrip.ojFilmStrip("getPagingModel");
          self.pagingModel = pagingModel;
        }
        return self.pagingModel;
      };
      getPagingModelfeatured = function () {
        if (!self.pagingModelfeatured) {
          var filmStrip = $("#filmStripfeatured");
          var pagingModel = filmStrip.ojFilmStrip("getPagingModel");
          self.pagingModelfeatured = pagingModel;
        }
        return self.pagingModelfeatured;
      };
      getPagingModelwins = function () {
        if (!self.pagingModelwins) {
          var filmStrip = $("#filmStripwins");
          var pagingModel = filmStrip.ojFilmStrip("getPagingModel");
          self.pagingModelwins = pagingModel;
        }
        return self.pagingModelwins;
      };

      self.handleActivated = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
