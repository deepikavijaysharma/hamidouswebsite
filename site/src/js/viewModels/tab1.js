define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtabs', 'ojs/ojconveyorbelt'],
 function(oj, ko, $) {
  
    function tabmodel() {
      var self = this;
      self.msg=ko.observable("Helloooooo!");
    }
    return new tabmodel();
  });