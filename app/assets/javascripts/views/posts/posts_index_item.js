JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['posts/index_item'],
  tagName: 'li',
  
  events: {
    "click .delete": "deletePost"
  },

  deletePost: function(event) {
    this.model.destroy();
  },

  render: function(){
    var content = this.template({ post: this.model});
    this.$el.html(content);
    return this;
  }
});
