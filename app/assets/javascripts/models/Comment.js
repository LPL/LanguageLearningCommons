LLC.Models.Comment = Backbone.Model.extend({
  initialize: function(ids) {
    // this.urlRoot = ('users/' + ids.userId + '/notes/' +
    // ids.noteId + '/comments/');

    // this.url = 'urltest';

    this.urlRoot = (LLC.note.id + '/comments/');

  },

  toJSON: function() {
    return { comment: {
      startOffset: this.attributes.startOffset,
      endOffset: this.attributes.endOffset,
      markType: this.attributes.markType,
      body: this.attributes.body
    }};
  }
});