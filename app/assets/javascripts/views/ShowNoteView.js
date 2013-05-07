ShowNoteView = Backbone.View.extend({
  render: function() {
    var that = this;

    $renderedContent = $('<div class="row"></div>')
    this.$el.html(JST['ShowNote']({
      note: that.model.attributes
    }));

    // rangy.init();
    // this.lobnoxClasser = rangy.createCssClassApplier("lobnox", {normalize: true});
    // _(that.model.attributes.comments).each(function(comment) {
    //   var range = rangy.deserializeRange(comment.range)
    //   this.lobnoxClasser.applyToRange(range);
    // })

    return that;
  },

  showComments: function(note) {
    var that = this;

    // var note;
    // if(note == null) {
    //   note =
    // }

    rangy.init();
    this.commentStyler = rangy.createCssClassApplier("comment", {normalize: true});
    _(that.model.attributes.comments).each(function(comment) {
      var range = rangy.deserializeRange(comment.range);
      that.commentStyler.applyToRange(range);
    })
  }

})