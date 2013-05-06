LLC = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function() {
    LLC.Comments = new LLC.Collections.Comments();
    LLC.Revisions = new LLC.Collections.Revisions();
  },

  showNote: function(note, $rootEl) {
    this.initialize();
    showNoteView = new ShowNoteView({ model: note });
    $rootEl.html(showNoteView.render().$el);
  },

  showRevisableNote: function(note, $rootEl) {
    this.initialize();
    showRevisableNoteView = new ShowRevisableNoteView({ model: note });
    $rootEl.html(showRevisableNoteView.render().$el);
  }
}