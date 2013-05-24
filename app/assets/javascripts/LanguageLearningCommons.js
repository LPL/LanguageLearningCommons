growFont = function(demoButton) {
  $(demoButton).animate({ 'margin-left': '0px' }, 500, function() {
    shrinkFont(demoButton)
  });
};

shrinkFont = function(demoButton) {
  $(demoButton).animate({ 'margin-left': '15px' }, 500, function() {
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