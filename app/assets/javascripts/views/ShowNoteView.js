ShowNoteView = Backbone.View.extend({
  render: function() {
    var that = this;

    $renderedContent = $('<div class="row"></div>')
    this.$el.html(JST['ShowNote']({
      note: that.model.attributes
    }));

    rangy.init();
    this.lobnoxClasser = rangy.createCssClassApplier("lobnox", {normalize: true});
    LLC.comments.each(function(comment) {
      this.lobnoxClasser.applyToRange(comment.range);
    })

    return that;
  }
})