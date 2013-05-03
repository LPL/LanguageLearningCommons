Note = Backbone.Model.extend({
  urlRoot: function() {
    return ('/users/' + this.authorId + '/notes/' + this.noteId)
  }
})