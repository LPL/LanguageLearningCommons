LLC.Models.Revision = Backbone.Model.extend({
  initialize: function(ids) {
    // this.urlRoot = ('users/' + ids.userId + '/notes/' +
    // ids.noteId + '/comments/');

    // this.url = 'urltest';

    this.urlRoot = (LLC.note.id + '/revisions/');

  },

  toJSON: function() {
    return { revision: {
      anchorOffset: this.attributes.anchorOffset,
      focusOffset: this.attributes.focusOffset,
      markType: this.attributes.markType,
      body: this.attributes.body
    }};
  }
});