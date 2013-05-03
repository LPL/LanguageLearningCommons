ShowNoteView = Backbone.View.extend({
  render: function() {
    var that = this;

    $renderedContent = $('<div class="row"></div>')
    this.$el.html(JST['ShowNote']({
      note: that.model
    }));
    return that;
  }
})