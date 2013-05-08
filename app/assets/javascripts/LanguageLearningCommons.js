LLC = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function() {
    LLC.comments = new LLC.Collections.Comments();
    LLC.revisions = new LLC.Collections.Revisions();
  },

  showNote: function(unmodeledNote, $rootEl) {
    this.initialize();
    LLC.note = new LLC.Models.Note(unmodeledNote[0]);
    LLC.comments = new LLC.Collections.Comments(unmodeledNote[0].comments);
    LLC.revisions = new LLC.Collections.Revisions(unmodeledNote[0].revisions);
    showNoteView = new ShowNoteView({ model: this.note });
    $rootEl.html(showNoteView.render().$el);
    // showNoteView.showComments();
    // showNoteView.showRevisions();
    this.showNoteView.showReviews();
  },

  showRevisableNote: function(unmodeledNote, $rootEl) {
    this.initialize();
    LLC.note = new LLC.Models.Note(unmodeledNote[0]);
    LLC.comments = new LLC.Collections.Comments(unmodeledNote[0].comments);
    console.log("!!!");
    console.log(unmodeledNote[0].revisions);
    LLC.revisions = new LLC.Collections.Revisions(unmodeledNote[0].revisions);
    showRevisableNoteView = new ShowRevisableNoteView({ model: this.note });
    $rootEl.html(showRevisableNoteView.render().$el);
    // showRevisableNoteView.showNoteView.showComments();
    // showRevisableNoteView.showNoteView.showRevisions();
    showRevisableNoteView.showNoteView.showReviews();
  }
}