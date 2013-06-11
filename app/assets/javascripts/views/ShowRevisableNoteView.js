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
    this.validateSelection(LLC.Models.Comment);
  },

  launchRevision: function() {
    this.validateSelection(LLC.Models.Revision);
  },

  validateSelection: function(markType) {
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
      that.launchMark(markType, that.selection);
    }
  },

  offsets: function(selection) {
    var dynamicOffsetBase = this.dynamicOffsetBase(selection);
    if(selection.anchorOffset < selection.focusOffset) {
      return {
        startOffset: selection.anchorOffset + dynamicOffsetBase,
        endOffset: selection.focusOffset + dynamicOffsetBase
      }
    } else if(selection.anchorOffset > selection.focusOffset){
      return {
        startOffset: selection.focusOffset + dynamicOffsetBase,
        endOffset: selection.anchorOffset + dynamicOffsetBase
      }
    }
  },

  launchMark: function(markType, selection) {
    var that = this;

    $('#markForm').empty();
    var offsets = this.offsets(selection);
    var startOffset = offsets.startOffset;
    var endOffset = offsets.endOffset;
    that.$markTextBox = $('<input type="textArea" name="body" id="markTextBox">');
    that.$markSaveButton = $('<button class="btn" id="markSaveButton" type="button">Save</button>');
    $('#markForm').append(that.$markTextBox);
    $('#markForm').append(that.$markSaveButton);
    that.$markTextBox.keyup(function(ev) {
      if(ev.which == 13) {
        that.storeMark(startOffset, endOffset, selection.toString(), markType);
      }
    });
    that.$markSaveButton.on('click', that.storeMark.bind(that, startOffset, endOffset, 
                                                         selection.toString(), markType));
    that.$markTextBox.focus();
  },

  storeMark: function(startOffset, endOffset, originalText, markType) {
    var that = this;
    this.mark = new (markType == LLC.Models.Comment ?
                     LLC.Models.Comment : LLC.Models.Revision)({
      body: this.$markTextBox.val(),
      startOffset: startOffset,
      endOffset: endOffset,
      markType: markType == LLC.Models.Comment ? "comment" : "revision"
    });
    if(markType == LLC.Models.Revision) {
      this.mark.originalText = originalText;
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