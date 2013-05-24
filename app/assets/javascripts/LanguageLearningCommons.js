growFont = function(demoButton) {
  $(demoButton).animate({ 'padding': '11px 19px' }, 1000, function() {
    shrinkFont(demoButton)
  });
};

shrinkFont = function(demoButton) {
  $(demoButton).animate({ 'padding': '13px 23px' }, 1000, function() {
    growFont(demoButton)
  });
};

$(function() {
  if($('.demoButton').length != 0) {
    _($('.demoButton')).each(function(demoButton) {
      growFont(demoButton);
    })
  }
})

LLC = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function(unmodeledNote) {
    LLC.note = new LLC.Models.Note(unmodeledNote[0]);
    LLC.comments = new LLC.Collections.Comments(unmodeledNote[0].comments);
    LLC.revisions = new LLC.Collections.Revisions(unmodeledNote[0].revisions);
  },

  showNote: function(unmodeledNote, $rootEl) {
    this.initialize(unmodeledNote);
    showNoteView = new ShowNoteView({ model: this.note });
    $rootEl.html(showNoteView.render().$el);
    this.showNoteView.showReviews();
  },

  showRevisableNote: function(unmodeledNote, $rootEl) {
    this.initialize(unmodeledNote);
    showRevisableNoteView = new ShowRevisableNoteView({ model: this.note });
    $rootEl.html(showRevisableNoteView.render().$el);
    showRevisableNoteView.showNoteView.showReviews();
  }
}