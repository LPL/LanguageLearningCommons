LLC.Models.Note = Backbone.RelationalModel.extend({
  urlRoot: function() {
    return ('/users/' + this.author_id + '/notes/' + this.id)
  },

  relations: [
    {
      type: 'HasMany',
      key: 'comments',
      relatedModel: 'LLC.Models.Comment',
      collectionType: 'LLC.Collections.Comments',
      reverseRelation: {
        key: 'note'
      }
    },
    {
      type: 'HasMany',
      key: 'revisions',
      relatedModel: 'LLC.Models.Revision',
      collectionType: 'LLC.Collections.Revisions',
      reverseRelation: {
        key: 'note'
      }
    }
  ]
})