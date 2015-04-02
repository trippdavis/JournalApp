JournalApp.Routers.Posts = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$sidebar = this.$rootEl.find(".sidebar");
    this.$content = this.$rootEl.find(".content");
    this.posts = new JournalApp.Collections.Posts();
    this.posts.fetch({
      success: function () {
        var content = new JournalApp.Views.PostsIndex({collection: this.posts});
        this.$sidebar.html(content.render().$el);
      }.bind(this)
    });
  },

  routes: {
    "": "postsIndex",
    "posts/new": "newPost",
    "posts/:id": "postShow"
  },

  postsIndex: function () {
    this.$content.empty();
    // this.posts.fetch({
    //   success: function () {
    //     var view = new JournalApp.Views.PostsIndex({collection: this.posts});
    //     this.$content.html(view.render().$el);
    //   }.bind(this)
    // });
  },

  postShow: function (id) {
    var post = this.posts.getOrFetch(id);
    var view = new JournalApp.Views.PostShow({model: post, collection: this.posts});
    this.$content.html(view.render().$el);
  },

  newPost: function () {
    var post = new JournalApp.Models.Post();
    var view = new JournalApp.Views.PostForm({model: post, collection: this.posts});
    this.$content.html(view.render().$el);
  }

});
