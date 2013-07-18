LLC = {
  Models: {},
  Collections: {},
  Views: {},

  initialize: function(unmodeledNote) {
    LLC.note = new LLC.Models.Note(unmodeledNote[0]);
    LLC.marks =  new LLC.Collections.Marks(unmodeledNote[0].marks);
  },

  showNote: function(unmodeledNote, $rootEl) {
    this.initialize(unmodeledNote);
    this.showNoteView = new ShowNoteView({ model: this.note });
    $rootEl.html(this.showNoteView.render().$el);
  },

  showRevisableNote: function(unmodeledNote, $rootEl) {
    this.initialize(unmodeledNote);
    this.showRevisableNoteView = new ShowRevisableNoteView({ model: this.note });
    $rootEl.html(this.showRevisableNoteView.render().$el);
  },

  popUp: function(alert, notice) {
    if(alert) {
      this.popUpView = new PopUpView({message: alert, type: "alert"});
    } else {
      this.popUpView = new PopUpView({message: notice, type: "notice"});
    };
    $('body').append(this.popUpView.render().el$);
  },

  // darken and lighten enable a button to glow
  darken: function($demoButton) {
    $demoButton.animate({ 'color': '#444',
                          'background-color': '#ccc' }, 400, function() {
      LLC.lighten($demoButton);
    });
  },

  lighten: function($demoButton) {
    $demoButton.animate({ 'color': '#777',
                          'background-color': '#fff' }, 400, function() {
      LLC.darken($demoButton);
    });
  }
}

// initiate button glowing
$(function() {
  if($('.demoButton')) {
    var $demoButton = $('.demoButton');
    LLC.darken($demoButton);
  }
})