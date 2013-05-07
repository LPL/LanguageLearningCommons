LLC.Models.Comment = Backbone.Model.extend({
  initialize: function(ids) {
    // this.urlRoot = ('users/' + ids.userId + '/notes/' +
    // ids.noteId + '/comments/');

    // this.url = 'urltest';

    this.urlRoot = (LLC.note.id + '/comments/');

  }
});

