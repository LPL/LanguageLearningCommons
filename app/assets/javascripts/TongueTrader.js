TT = {
  showNote: function(note, $rootEl) {
    showNoteView = new ShowNoteView({ model: note });
    $rootEl.html(showNoteView.render().$el);
  },

  showRevisableNote: function(note, $rootEl) {
    showRevisableNoteView = new ShowRevisableNoteView({ model: note });
    $rootEl.html(showRevisableNoteView.render().$el);
  }
}