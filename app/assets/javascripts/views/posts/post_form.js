JournalApp.Views.PostForm = Backbone.View.extend({

  template: JST["posts/post_form"],

  events: {
    "click .submit-button": "submitPost"
  },

  render: function () {
    var content = this.template({post: this.model});
    this.$el.html(content);
    return this;
  },

  submitPost: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget.parentElement).serializeJSON();
    this.model.save(params.post, {
      success: function (post) {
        if (this.collection) {
          this.collection.add(post, {merge: true});
        }
        Backbone.history.navigate("", { trigger: true });
      }.bind(this),
      error: function (post, response) {
        this.$el.empty();
        this.$el.append(response.responseJSON);
        var content = this.template({ post: post});
        this.$el.append(content);
      }.bind(this)
    });
  }


});
