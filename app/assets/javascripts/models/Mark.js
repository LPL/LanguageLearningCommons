LLC.Models.Mark = Backbone.Model.extend({
  initialize: function(ids) {
    this.urlRoot = (LLC.note.id + '/marks/');
  },

  toJSON: function() {
    return { mark: {
      startOffset: this.attributes.startOffset,
      endOffset: this.attributes.endOffset,
      markType: this.attributes.markType,
      body: this.attributes.body
    }};
  }
});