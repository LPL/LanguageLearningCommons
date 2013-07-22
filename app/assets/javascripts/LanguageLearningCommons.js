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

  popUp: function(message) {
    if(message.alert) {
      this.popUpView = new PopUpView({text: message.alert, type: "alert"});
    } else if(message.notice) {
      this.popUpView = new PopUpView({text: message.notice, type: "notice"});
    }
    $('body').append(this.popUpView.render().$el);
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
  },

  // toggleCheckboxes makes a series of checkboxes behave like checkbox/radio button hybrids in a situation where neither checkboxes or radiobutton were appropriate. This is not good design, and I plan on creating something new (probably pure JS) to replace it in the future--it's a quick fix necessary to avoid an error.
  toggleCheckboxes: function() {

    // for each checkbox in one column
    _($('.known_cb')).each(function(checkbox) {
      // when it gets checked
      $(checkbox).on("change", function() {
        // uncheck to corrosponding checbox in alother column
        $('.learning_cb[value=' + $(checkbox).attr("value") + ']').prop("checked", false);
      });
    });

    // and vice versa
    _($('.learning_cb')).each(function(checkbox) {
      $(checkbox).on("change", function() {
        $('.known_cb[value=' + $(checkbox).attr("value") + ']').prop("checked", false);
      });
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