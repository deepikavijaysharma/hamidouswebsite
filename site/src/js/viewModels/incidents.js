define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojknockout',
      'ojs/ojselectcombobox', 'ojs/ojbutton','ojs/ojnavigationlist','ojs/ojswitch','ojs/ojradioset', 'ojs/ojcollapsible'],
 function(oj, ko, $) {
  
    function IncidentsViewModel() {
      var self = this;
                 this.navigationLevel = ko.observable('page');
           this.isChecked = ko.observable();
           this.isChecked.subscribe(function(newValue) {
               var navlistInstances = $('#navlistdemo').find(':oj-navigationlist');
               if(newValue) {
                   navlistInstances.addClass('oj-sm-condense');
               } else {
                   navlistInstances.removeClass('oj-sm-condense');
               }
           });
           this.isContrastBackground = ko.observable(false);
           this.isContrastBackground.subscribe(function(newValue) {
               if(newValue) {
                   $(".navlistcontainer").addClass("demo-panel-contrast1 oj-contrast-marker");
               } else {
                   $(".navlistcontainer").removeClass("demo-panel-contrast1 oj-contrast-marker");
               }
           });
       self.currentValue = ko.observableArray();
      self.currentRawValue = ko.observable();
      self.buttonDisabled = ko.observable(true);

      self.searchInput = function()
      {
        alert("We enable the Search button when rawValue is not empty.");
      };

      // // callback when an option changes. Check is that the option changed is 'rawValue' and 
      // // if 'rawValue' is not empty, enable the 'Search' button, else disable it.
      self.optionChangeCallback = function(event, data)
      {
        var rawValue, elem;
        if (data['option'] === "rawValue")
        {
          elem = $("#search-input");
          rawValue = elem.ojInputSearch("option", "rawValue");
          if (rawValue)
          {
            self.buttonDisabled(false);
          }
          else
          {
            self.buttonDisabled(true);
          }
        }      
      };
      //         self.chemicals = [
      //       { name: 'Mandatory Courses (13 Courses)', 
      //         sizeClass: 'oj-masonrylayout-tile-2x2 coursescat' },
      //       { name: 'Course Title', 
      //         sizeClass: 'oj-masonrylayout-tile-2x2 courses' },
      //       { name: 'Course Title', 
      //         sizeClass: 'oj-masonrylayout-tile-2x2 courses' },
      //       { name: 'Course Title', 
      //         sizeClass: 'oj-masonrylayout-tile-2x2 courses' }
      //   ];
   //      self.handleOpen = $("#buttonOpener").click(function() {
   //     $("#modalDialog1").ojDialog("open"); });

   // self.handleOKClose = $("#okButton").click(function() {
   //     $("#modalDialog1").ojDialog("close"); });
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
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
    // $(function() {
    //   ko.applyBindings(null, document.getElementById('panelPage'))
    // });
    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new IncidentsViewModel();
  }
);
