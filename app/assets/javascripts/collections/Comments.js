LLC.Collections.Comments = Backbone.Collection.extend({
  initialize: function(userId, noteId) {
    this.url = ('users/' + userId + '/notes/' + this.noteId +
    '/comments/');
  },
  model: LLC.Models.Comment
});