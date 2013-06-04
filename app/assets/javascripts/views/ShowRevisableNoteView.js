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

  dynamicOffsetBase: function(selection) {
    // native offsets may not include the entire note because existing marks slice the 
    // noteBody node. This function finds all sibling text nodes previous to that of 
    // the new node and sums their length
    var dynamicOffsetBase = 0;
    var currentNode = selection.anchorNode;

    while(currentNode.previousSibling) {
      currentNode = currentNode.previousSibling;
      if(currentNode.nodeType == 3) {
        dynamicOffsetBase += currentNode.length;
      } else if(currentNode.nodeType == 1 && $(currentNode).attr('data-originalLength')) {
        dynamicOffsetBase += parseInt($(currentNode).attr('data-originalLength'));
      }
    }

    return dynamicOffsetBase;
  },

  launchComment: function() {
    var that = this;

    that.selection = window.getSelection();
    if(that.selection.rangeCount == 0 ||
       that.selection.type == "Caret") {
      $('#commentForm').html("Highlight the section of text you wish to comment on.");
    } else if(! that.selection.AnchorNode == that.selection.focusNode) {
      console.log("The selection must be within the text of the note.");
    } else {
      $('#commentForm').empty();
      $('#revisionForm').empty();
      var dynamicOffsetBase = that.dynamicOffsetBase(that.selection);
      if(that.selection.anchorOffset < that.selection.focusOffset) {
        var startOffset = that.selection.anchorOffset + dynamicOffsetBase;
        var endOffset = that.selection.focusOffset + dynamicOffsetBase;
      } else if(that.selection.anchorOffset > that.selection.focusOffset){
        var startOffset = that.selection.focusOffset + dynamicOffsetBase;
        var endOffset = that.selection.anchorOffset + dynamicOffsetBase;
      }
      that.$commentTextBox = $('<input type="textArea" name="body" id="commentTextBox">');
      that.$commentSaveButton = $('<button class="btn" type="button">Save</button>');
      $('#commentForm').append(that.$commentTextBox);
      $('#commentForm').append(that.$commentSaveButton);
      that.$commentSaveButton.on('click', that.storeComment.bind(that, startOffset, endOffset));
    }
  },

  storeComment: function(startOffset, endOffset) {
    var that = this;
    this.comment = new LLC.Models.Comment({
      body: this.$commentTextBox.val(),
      startOffset: startOffset,
      endOffset: endOffset,
      markType: 'comment'
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

    that.selection = window.getSelection();
    if(that.selection.rangeCount == 0 ||
       that.selection.type == "Caret") {
      $('#commentForm').html("Highlight text from the note to revise it.");
    } else if(! that.selection.AnchorNode == that.selection.focusNode) {
      console.log("The selection must be within the text of the note");
    } else {
      $('#revisionForm').empty();
      $('#commentForm').empty();
      var dynamicOffsetBase = that.dynamicOffsetBase(that.selection);
      if(that.selection.anchorOffset < that.selection.focusOffset) {
        var startOffset = that.selection.anchorOffset + dynamicOffsetBase;
        var endOffset = that.selection.focusOffset + dynamicOffsetBase;
      } else if(that.selection.anchorOffset > that.selection.focusOffset){
        var startOffset = that.selection.focusOffset + dynamicOffsetBase;
        var endOffset = that.selection.anchorOffset + dynamicOffsetBase;
      }
      that.$revisionTextBox = $('<input type="textArea" name="body" id="revisionTextBox">');
      that.$revisionSaveButton = $('<button class="btn" type="button">Save</button>');
      $('#revisionForm').append(that.$revisionTextBox);
      $('#revisionForm').append(that.$revisionSaveButton);
      that.$revisionSaveButton.on('click', that.storeRevision.bind(that,
        startOffset, endOffset, that.selection.toString));
    }
  },

  storeRevision: function(startOffset, endOffset, originalText) {
    var that = this;
    this.revision = new LLC.Models.Revision({
      body: this.$revisionTextBox.val(),
      originalText: originalText,
      startOffset: startOffset,
      endOffset: endOffset,
      markType: 'revision'
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