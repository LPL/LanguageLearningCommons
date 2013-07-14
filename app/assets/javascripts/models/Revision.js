LLC.Models.Revision = Backbone.Model.extend({
  initialize: function(ids) {
    this.urlRoot = (LLC.note.id + '/revisions/');
  },

  toJSON: function() {
    return { revision: {
      startOffset: this.attributes.startOffset,
      endOffset: this.attributes.endOffset,
      markType: this.attributes.markType,
      body: this.attributes.body
    }};
  }
});