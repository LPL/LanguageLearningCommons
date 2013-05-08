LLC = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function() {
    LLC.comments = new LLC.Collections.Comments();
    // LLC.revisions = new LLC.Collections.Revisions();
  },

  showNote: function(unmodeledNote, $rootEl) {
    this.initialize();
    LLC.note = new LLC.Models.Note(unmodeledNote[0]);
    LLC.comments = new LLC.Collections.Comments(unmodeledNote[0].comments);
    showNoteView = new ShowNoteView({ model: this.note });
    $rootEl.html(showNoteView.render().$el);
    showNoteView.showComments();
  },

  showRevisableNote: function(unmodeledNote, $rootEl) {
    this.initialize();
    LLC.note = new LLC.Models.Note(unmodeledNote[0]);
    LLC.comments = new LLC.Collections.Comments(unmodeledNote[0].comments);
    showRevisableNoteView = new ShowRevisableNoteView({ model: this.note });
    $rootEl.html(showRevisableNoteView.render().$el);
    showRevisableNoteView.showNoteView.showComments();
    // this.showComments(LLC.note);
  }
}