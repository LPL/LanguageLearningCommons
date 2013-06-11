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
    this.launchMark(LLC.Models.Comment);
  },

  launchRevision: function() {
    this.launchMark(LLC.Models.Revision);
  },

  launchMark: function(markType) {
  var that = this;

    that.selection = window.getSelection();
    if(that.selection.rangeCount == 0 ||
       that.selection.type == "Caret") {
      var highlightReminder = "First highlight the section of text you wish to" +
        (markType == LLC.Models.Comment ? "comment on." : "revise.")
      $('#markForm').html(highlightReminder);
    } else if(! that.selection.AnchorNode == that.selection.focusNode) {
      console.log("The selection must be within the text of the note.");
    } else {
      $('#markForm').empty();
      var dynamicOffsetBase = that.dynamicOffsetBase(that.selection);
      if(that.selection.anchorOffset < that.selection.focusOffset) {
        var startOffset = that.selection.anchorOffset + dynamicOffsetBase;
        var endOffset = that.selection.focusOffset + dynamicOffsetBase;
      } else if(that.selection.anchorOffset > that.selection.focusOffset){
        var startOffset = that.selection.focusOffset + dynamicOffsetBase;
        var endOffset = that.selection.anchorOffset + dynamicOffsetBase;
      }
      that.$markTextBox = $('<input type="textArea" name="body" id="markTextBox">');
      that.$markSaveButton = $('<button class="btn" id="markSaveButton" type="button">Save</button>');
      $('#markForm').append(that.$markTextBox);
      $('#markForm').append(that.$markSaveButton);
      that.$markTextBox.focus();
      that.$markTextBox.keyup(function(ev) {
        if(ev.which == 13) {
          that.storeMark(startOffset, endOffset, that.selection.toString);
        }
      });
      that.$markSaveButton.on('click', that.storeMark.bind(that, startOffset, endOffset, 
                                                           that.selection.toString, markType));
    }
  },

  storeMark: function(startOffset, endOffset, originalText, markType) {
    var that = this;
    if(markType == LLC.Models.Comment) {
      this.mark = new LLC.Models.Comment({
        body: this.$markTextBox.val(),
        startOffset: startOffset,
        endOffset: endOffset,
        markType: 'comment'
      })
    } else if(markType == LLC.Models.Revision) {
      this.mark = new LLC.Models.Comment({
        body: this.$markTextBox.val(),
        startOffset: startOffset,
        endOffset: endOffset,
        markType: 'revision',
        originalText: originalText
      })
    }
    $('#markForm').empty();
    this.mark.save({}, {
      success: function(savedMark) {
        (markType == LLC.Models.Comment ? LLC.comments : LLC.revisions).add(savedMark);
        that.showNoteView.render();
        that.showNoteView.showMarks();
      }
    });  
  },

  dynamicOffsetBase: function(selection) {
    // native offsets may not include the entire note because existing marks cut off 
    // earlier parts of the noteBody node. This function finds all sibling text 
    // nodes previous to that of the new node and sums their length.
    var dynamicOffsetBase = 0;
    var currentNode = selection.anchorNode;

    while(currentNode.previousSibling) {
      currentNode = currentNode.previousSibling;
      if(currentNode.nodeType == 3) {
        dynamicOffsetBase += currentNode.length;
      } else if(currentNode.nodeType == 1 && $(currentNode).attr('data-originalLength')) {
        dynamicOffsetBase += parseInt($(currentNode).attr('data-originalLength'));
      } else if(currentNode.nodeType == 1) {
        dynamicOffsetBase += $(currentNode).text().length;
      }
    }

    return dynamicOffsetBase;
  }
})