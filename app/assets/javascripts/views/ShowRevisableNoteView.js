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

    // console.log("launchComment");
    that.selection = rangy.getSelection();
    if(that.selection.rangeCount == 0) {
      console.log("No selection detected.");
    } else if(! that.selection.AnchorNode == that.selection.focusNode) {
      console.log("The selection must be within the text area");
    } else {
      $('#commentForm').empty();
      $('#revisionForm').empty();
      that.range = that.selection.getRangeAt(0);
      // that.comment = {startToEnd: [that.range.startOffset, that.range.endOffset]};
      // that.derange = rangy.createRangyRange();
      // that.derange.setStart(range.startContainer, range.startOffset);
      // that.derange.setEnd(range.endContainer, range.endOffset);
      // this.floxor();

      // console.log(range);
      // console.log(that.range.toString());
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
      range: this.range,
      userId: this.model.author_id,
      noteId: this.model.id
    });
    $('#commentForm').empty();
    // console.log(this.comment.body);
    this.model.get('comments').add(this.comment);
    this.comment.save();
    // this.showNoteView.render();
    console.log(this.model);
  },

  floxor: function() {
    // rangy.init();
    this.cssApplier = rangy.createCssClassApplier("lobnox", {normalize: true});
    // if(this.range != null) {
      this.cssApplier.applyToRange(this.range);
    // }

  }
})

// action="/users/<%= note_author_id %>/notes/<%= note_id %>" method="POST"