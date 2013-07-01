LLC.Models.Note = Backbone.Model.extend({
  urlRoot: function() {
    return ('/users/' + this.author_id + '/notes/')
  }
})