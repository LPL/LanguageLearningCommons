LLC.Models.Revision = Backbone.Model.extend({
  initialize: function(ids) {
    // this.urlRoot = ('users/' + ids.userId + '/notes/' +
    // ids.noteId + '/comments/');

    // this.url = 'urltest';

    this.urlRoot = (LLC.note.id + '/revisions/');

  },

  toJSON: function() {
    return { revision: {
      range: this.attributes.range,
      body: this.attributes.body
    }};
  }
});