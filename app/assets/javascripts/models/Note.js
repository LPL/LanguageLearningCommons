Note = Backbone.Model.extend({
  urlRoot: function() {
    return ('/users/' + this.authorId + '/notes/' + this.noteId)
  },

  relations: [
    {
      type: 'HasMany',
      key: 'comments',
      relatedModel: 'LLC.models.Comment',
      collectionType: 'LLC.collections.Comments',
      reverseRelation: {
        key: 'note'
      }
    },

    {
      type: 'HasMany',
      key: 'revisions',
      relatedModel: 'LLC.models.Revision',
      collectionType: 'LLC.collections.Revisions',
      reverseRelation: {
        key: 'note'
      }
    }
  ]
})