JournalApp.Views.PostShow = Backbone.View.extend ({
  template: JST["posts/show"],

  events: {
    "click .back-to-index": "backToIndex",
    "click .edit-post-link": "editPost",
    "dblclick .post-title": "editTitle",
    "dblclick .post-body": "editBody",
    "blur .new-title": "updateTitle",
    "blur .new-body": "updateBody"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  backToIndex: function () {
    Backbone.history.navigate("", {trigger: true});
  },

  editPost: function () {
    var editForm = new JournalApp.Views.PostForm({model: this.model});
    this.$el.find('.edit-post-link').remove();
    this.$el.append(editForm.render().$el);
  },

  editTitle: function () {
    this.$div = this.$el.find(".post-title");
    this.$div.html("<input class='new-title' type='text' name='post[title]' value='" + this.model.escape('title') + "'>");
    this.$div.find(".new-title").focus();
  },

  updateTitle: function (event) {
    var value = $(event.currentTarget).val();
    this.model.save({title: value}, {
      success: function () {
        this.collection.add(this.model, {merge: true});
        this.render();
      }.bind(this)
    })
  },

  editBody: function () {
    this.$div = this.$el.find(".post-body");
    this.$div.html("<textarea class='new-body' name='post[body]'>" + this.model.escape('body') + "</textarea>");
    this.$div.find('.new-body').focus();
  },

  updateBody: function (event) {
    var value = $(event.currentTarget).val();
    this.model.save({body: value}, {
      success: function () {
        this.collection.add(this.model, {merge: true});
        this.render();
      }.bind(this)
    })
  },

  render: function () {
    var content = this.template({post: this.model});
    this.$el.html(content);
    return this;
  }
});
