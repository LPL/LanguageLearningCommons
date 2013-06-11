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
    this.showNoteView = new ShowNoteView({ model: this.note });
    $rootEl.html(this.showNoteView.render().$el);
    this.showNoteView.showMarks();
  },

  showRevisableNote: function(unmodeledNote, $rootEl) {
    this.initialize(unmodeledNote);
    this.showRevisableNoteView = new ShowRevisableNoteView({ model: this.note });
    $rootEl.html(this.showRevisableNoteView.render().$el);
    this.showRevisableNoteView.showNoteView.showMarks();
  },

  // darkenText and lightenText allow a button to glow
  darkenText: function($demoButton) {
    $demoButton.animate({ 'color': '#444',
                          'background-color': '#ccc' }, 400, function() {
      LLC.lightenText($demoButton);
    });
  },

  lightenText: function($demoButton) {
    $demoButton.animate({ 'color': '#777',
                          'background-color': '#fff' }, 400, function() {
      LLC.darkenText($demoButton);
    });
  }
}

// initiate button glowing
$(function() {
  if($('.demoButton')) {
    var $demoButton = $('.demoButton');
    LLC.darkenText($demoButton);
  }
})