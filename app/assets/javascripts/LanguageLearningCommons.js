LLC = {
  Models: {},
  Collections: {},
  Views: {},

  showNote: function(unmodeledNote, $rootEl) {
    var note = new LLC.Models.Note(unmodeledNote);
    showNoteView = new ShowNoteView({ model: note });
    $rootEl.html(showNoteView.render().$el);
  },

  showRevisableNote: function(unmodeledNote, $rootEl) {
    var note = new LLC.Models.Note(unmodeledNote);
    showRevisableNoteView = new ShowRevisableNoteView({ model: note });
    $rootEl.html(showRevisableNoteView.render().$el);
  }
}