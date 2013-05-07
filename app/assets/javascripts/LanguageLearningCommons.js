LLC = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function() {
    LLC.comments = new LLC.Collections.Comments();
  },

  showNote: function(unmodeledNote, $rootEl) {
    this.initialize();
    LLC.note = new LLC.Models.Note(unmodeledNote);
    var ryery = 45345;
    showNoteView = new ShowNoteView({ model: this.note });
    $rootEl.html(showNoteView.render().$el);
  },

  showRevisableNote: function(unmodeledNote, $rootEl) {
    this.initialize();
    LLC.note = new LLC.Models.Note(unmodeledNote);
    showRevisableNoteView = new ShowRevisableNoteView({ model: this.note });
    $rootEl.html(showRevisableNoteView.render().$el);
  }
}