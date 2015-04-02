window.JournalApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // alert('Hello from Backbone!');
    var router = new JournalApp.Routers.Posts({ $rootEl: $('div.journal-app') });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  JournalApp.initialize();
});
