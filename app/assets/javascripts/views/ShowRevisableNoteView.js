ShowRevisableNoteView = Backbone.View.extend({
  initialize: function(note) {
    console.log("ShowRevisableNoteView.initialize")
    this.showNoteView = new ShowNoteView({ model: this.model });
  },

  events: {
    'click #revisionButton': 'launchRevision',
    'click #commentButton': 'launchComment'
  },

  render: function() {
    console.log("ShowRevisableNoteView.render")

    var that = this;

    this.$el.html(this.showNoteView.render().$el);
    this.$el.append(JST['ReviseNote']({ note: that.model }));

    return this;
  },

  launchRevision: function() {
    console.log("launchRevision");
    var selection = rangy.getSelection();
    console.log(selection);
  },

  launchComment: function() {
    console.log("launchComment");
    var selection = rangy.getSelection();
    console.log(selection);
  }
})