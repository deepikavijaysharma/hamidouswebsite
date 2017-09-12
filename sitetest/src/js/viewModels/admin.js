
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout','ojs/ojtabs', 'ojs/ojconveyorbelt','ojs/ojselectcombobox','ojs/ojinputtext'],
  function (oj, ko, $) {
    function createcoursemodel() {
      var self=this;
      self.role=ko.observable('Test Role');
      
    }

    return new createcoursemodel();
  });	
