LLC = {
  Models: {},
  Collections: {},
  Views: {},

  // initialize: function() {
  //   LLC.Comments = new LLC.Collections.Comments();
  //   LLC.Revisions = new LLC.Collections.Revisions();
  // },

  showNote: function(unmodeledNote, $rootEl) {
    // console.log(unmodeledNote);
    // this.initialize();
    var note = new LLC.Models.Note(unmodeledNote);
    showNoteView = new ShowNoteView({ model: note });
    $rootEl.html(showNoteView.render().$el);
  },

  showRevisableNote: function(unmodeledNote, $rootEl) {
    // console.log(unmodeledNote);
    // this.initialize();
    var note = new LLC.Models.Note(unmodeledNote);
    showRevisableNoteView = new ShowRevisableNoteView({ model: note });
    $rootEl.html(showRevisableNoteView.render().$el);
  }
}