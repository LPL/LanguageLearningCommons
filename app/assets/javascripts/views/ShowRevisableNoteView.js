ShowRevisableNoteView = Backbone.View.extend({
  initialize: function(note) {
    console.log("ShowRevisableNoteView.initialize")
    this.showNoteView = new ShowNoteView({ model: this.model });
  },

  events: {
    'click #revisionButton': 'launchRevision',
    'click #commentButton': 'launchComment'
  },

  render: function() {
    console.log("ShowRevisableNoteView.render")

    var that = this;

    this.$el.html(this.showNoteView.render().$el);
    this.$el.append(JST['ReviseNote']({ note: that.model,
                                        note_author_id: "2",
                                        note_id: "2"
    }));

    return this;
  },

  launchComment: function() {
    var that = this;

    $('#commentForm').empty();
    $('#revisionForm').empty();
    // console.log("launchComment");
    var selection = window.getSelection();
    if(selection.rangeCount == 0) {
      console.log("No selection detected.");
    } else if(! selection.AnchorNode == selection.focusNode) {
      console.log("The selection must be within the text area");
    } else {
      var range = selection.getRangeAt(0);
      that.comment = {startToEnd: [range.startOffset, range.endOffset]};
      // console.log(range);
      console.log(range.toString());
      that.$commentTextBox = $('<input type="textArea" name="body" id="revisionTextBox">');
      that.$commentSaveButton = $('<input type="submit" value="Save">');
      $('#commentForm').append(that.$commentTextBox);
      $('#commentForm').append(that.$commentSaveButton);
      that.$commentSaveButton.on('click', that.storeComment.bind(that));
    }
  },

  storeComment: function() {
    this.comment.body = this.$commentTextBox.val();
    $('#commentForm').empty();
    console.log(this.comment.body);
    LLC.Comments.add(this.comment);
    this.showNoteView.render();
  }
})

// action="/users/<%= note_author_id %>/notes/<%= note_id %>" method="POST"