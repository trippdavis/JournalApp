JournalApp.Views.PostsIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "remove sync", this.render)
  },

  template: JST['posts/index'],

  render: function () {
    var $content = $(this.template());
    // var $ul = this.$('ul.posts-index');
    // debugger
    this.collection.each(function(post) {
      var view = new JournalApp.Views.PostsIndexItem({ model: post });
      $content.append(view.render().$el);
    });

    this.$el.html($content);
    return this;
  }

});
