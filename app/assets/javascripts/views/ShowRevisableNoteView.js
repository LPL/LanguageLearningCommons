ShowRevisableNoteView = Backbone.View.extend({
  initialize: function(note) {
    this.showNoteView = new ShowNoteView({ model: this.model });
  },

  events: {
    'click #revisionButton': 'launchRevision',
    'click #commentButton': 'launchComment'
  },

  render: function() {
    var that = this;

    this.$el.html(this.showNoteView.render({ model: this.model }).$el);
    this.$el.append(JST['ReviseNote']({ note: that.model,
                                        note_author_id: "2",
                                        note_id: "2"
    }));

    return this;
  },

  launchComment: function() {
    var that = this;

    that.selection = rangy.getSelection();
    if(that.selection.rangeCount == 0 ||
       that.selection.nativeSelection.type == "Caret") {
      $('#commentForm').html("Highlight the section of text you wish to comment on.");
    } else if(! that.selection.AnchorNode == that.selection.focusNode) {
      console.log("The selection must be within the text area");
    } else {
      console.log("comment lanuch");
      $('#commentForm').empty();
      $('#revisionForm').empty();
      var range = that.selection.getRangeAt(0);
      that.$commentTextBox = $('<input type="textArea" name="body" id="commentTextBox">');
      that.$commentSaveButton = $('<button class="btn" type="button">Save</button>');
      $('#commentForm').append(that.$commentTextBox);
      $('#commentForm').append(that.$commentSaveButton);
      that.$commentSaveButton.on('click', that.storeComment.bind(that, range));
    }
  },

  storeComment: function(range) {
    var that = this;
    this.comment = new LLC.Models.Comment({
      body: this.$commentTextBox.val(),
      range: rangy.serializeRange(range, true),
      reviewType: 'comment'
    });
    $('#commentForm').empty();
    this.comment.save({}, {
      success: function(savedComment) {
        LLC.comments.add(savedComment);
        that.showNoteView.render();
        that.showNoteView.showReviews();
      }
    });
  },

  launchRevision: function() {
    var that = this;

    that.selection = rangy.getSelection();
    if(that.selection.rangeCount == 0) {
      $('#commentForm').html("Highlight text from the note to revise it.");
    } else if(! that.selection.AnchorNode == that.selection.focusNode) {
      console.log("The selection must be within the text area");
    } else {
      console.log("revision lanuch");
      $('#revisionForm').empty();
      $('#commentForm').empty();
      var range = that.selection.getRangeAt(0);
      that.$revisionTextBox = $('<input type="textArea" name="body" id="revisionTextBox">');
      that.$revisionSaveButton = $('<button class="btn" type="button">Save</button>');
      $('#revisionForm').append(that.$revisionTextBox);
      $('#revisionForm').append(that.$revisionSaveButton);
      that.$revisionSaveButton.on('click', that.storeRevision.bind(that, range));
    }
  },

  storeRevision: function(range) {
    var that = this;
    this.revision = new LLC.Models.Revision({
      body: this.$revisionTextBox.val(),
      originalText: range.toString(),
      range: rangy.serializeRange(range, true),
      reviewType: 'revision'
    });
    $('#revisionForm').empty();
    this.revision.save({}, {
      success: function(savedRevision) {
        LLC.revisions.add(savedRevision);
        that.showNoteView.render();
        that.showNoteView.showReviews();
      }
    });
  }
})