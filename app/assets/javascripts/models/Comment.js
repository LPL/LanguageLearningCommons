LLC.Models.Comment = Backbone.RelationalModel.extend({
  initialize: function(userId, noteId) {
    this.urlRoot = ('users/' + this.userId + '/notes/' + this.noteId +
    '/comments/');
  }
});

