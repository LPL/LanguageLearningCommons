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
      console.log("comment lanuch?");
      $('#commentForm').empty();
      $('#revisionForm').empty();
      that.range = that.selection.getRangeAt(0);
      that.$commentTextBox = $('<input type="textArea" name="body" id="commentTextBox">');
      that.$commentSaveButton = $('<input type="submit" value="Save">');
      $('#commentForm').append(that.$commentTextBox);
      $('#commentForm').append(that.$commentSaveButton);
      that.$commentSaveButton.on('click', that.storeComment.bind(that));
    }
  },

  storeComment: function() {
    this.comment = new LLC.Models.Comment({
      body: this.$commentTextBox.val(),
      range: rangy.serializeRange(this.range, true)
    });
    $('#commentForm').empty();
    LLC.comments.add(this.comment);
    this.comment.save();
    this.model.fetch();
    this.showNoteView.render();
    this.showNoteView.showComments();
  }//,

  // launchRevision: function() {
  //   var that = this;
  //
  //   that.selection = rangy.getSelection();
  //   if(that.selection.rangeCount == 0) {
  //     console.log("No selection detected.");
  //   } else if(! that.selection.AnchorNode == that.selection.focusNode) {
  //     console.log("The selection must be within the text area");
  //   } else {
  //     console.log("comment lanuch?");
  //     $('#revisionForm').empty();
  //     $('#commentForm').empty();
  //     that.range = that.selection.getRangeAt(0);
  //     that.$revisionTextBox = $('<input type="textArea" name="body" id="revisionTextBox">');
  //     that.$revisionSaveButton = $('<input type="submit" value="Save">');
  //     $('#revisionForm').append(that.$revisionTextBox);
  //     $('#revisionForm').append(that.$revisionSaveButton);
  //     that.$revisionSaveButton.on('click', that.storeRevision.bind(that));
  //   }
  // },
  //
  // storeRevision: function() {
  //   this.revision = new LLC.Models.Revision({
  //     body: this.$revisionTextBox.val(),
  //     range: rangy.serializeRange(this.range, true)
  //   });
  //   $('#revisionForm').empty();
  //   LLC.revisions.add(this.revision);
  //   this.revision.save();
  //   this.model.fetch();
  //   this.showNoteView.render();
  //   this.showNoteView.showRevisions();
  // }
})
