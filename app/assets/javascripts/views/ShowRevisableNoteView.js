ShowRevisableNoteView = Backbone.View.extend({
  initialize: function(note) {
    this.showNoteView = new ShowNoteView({ model: this.model });
  },

  events: {
    'click #revisionButton': 'launchRevision',
    'click #commentButton': 'launchComment'
  },

  render: function() {
    console.log("ShowRevisableNoteView.render")

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
    if(that.selection.rangeCount == 0) {
      console.log("No selection detected.");
    } else if(! that.selection.AnchorNode == that.selection.focusNode) {
      console.log("The selection must be within the text area");
    } else {
      $('#commentForm').empty();
      $('#revisionForm').empty();
      that.range = that.selection.getRangeAt(0);
      that.$commentTextBox = $('<input type="textArea" name="body" id="revisionTextBox">');
      that.$commentSaveButton = $('<input type="submit" value="Save">');
      $('#commentForm').append(that.$commentTextBox);
      $('#commentForm').append(that.$commentSaveButton);
      that.$commentSaveButton.on('click', that.storeComment.bind(that));
    }
  },

  storeComment: function() {
    this.comment = new LLC.Models.Comment({
      body: this.$commentTextBox.val(),
      // range: this.range,
      // userId: this.model.attributes.author_id.toString(),
      // noteId: this.model.id.toString()
    });
    $('#commentForm').empty();
    LLC.comments.add(this.comment);
    this.comment.save();
  }
})
