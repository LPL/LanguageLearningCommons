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
    this.mark = new LLC.Models.Comment({markType: "comment"});
    this.validateSelection();
  },

  launchRevision: function() {
    this.mark = new LLC.Models.Revision({markType: "revision"});
    this.validateSelection();
  },

  validateSelection: function(markType) {
    var that = this;

    that.selection = window.getSelection();
    if(that.selection.rangeCount == 0 ||
       that.selection.type == "Caret") { // no text selected
      var highlightReminder = "First highlight the section of text you wish to" +
        (markType == LLC.Models.Comment ? "comment on." : "revise.")
      $('#markForm').html(highlightReminder);
    } else if(! that.selection.AnchorNode == that.selection.focusNode) {
      console.log("The selection must be within the text of the note.");
    } else {
      that.setOffsets(that.selection);
      that.launchMark(markType, that.selection);
    }
  },

  setOffsets: function(selection) {
    var dynamicOffsetBase = this.dynamicOffsetBase(selection);
    if(selection.anchorOffset < selection.focusOffset) {
      this.mark.set('startOffset', (selection.anchorOffset + dynamicOffsetBase));
      this.mark.set('endOffset', (selection.focusOffset + dynamicOffsetBase));
    } else if(selection.anchorOffset > selection.focusOffset) {
      this.mark.set('startOffset', (selection.focusOffset + dynamicOffsetBase));
      this.mark.set('endOffset', (selection.anchorOffset + dynamicOffsetBase));
    }
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
  },

  launchMark: function(markType, selection) {
    var that = this;

    $('#markForm').empty();
    that.$markTextBox = $('<input type="textArea" name="body" id="markTextBox">');
    that.$markSaveButton = $('<button class="btn" id="markSaveButton" type="button">Save</button>');
    $('#markForm').append(that.$markTextBox, that.$markSaveButton);
    that.$markTextBox.keyup(function(ev) {
      if(ev.which == 13) {
        that.createMark(selection.toString());
      }
    });
    that.$markSaveButton.on('click', that.createMark.bind(that, selection.toString()));
    that.$markTextBox.focus();
  },

  createMark: function(originalText) {
    this.mark.set('body', this.$markTextBox.val());
    if(this.mark.markType == "revision") {
      this.mark.set('originalText', originalText);
    }
    $('#markForm').empty();
    this.storeMark();
  },

  storeMark: function() {
    var that = this;

    this.mark.save({}, {
      success: function(savedMark) {
        (that.mark.markType == LLC.Models.Comment ? LLC.comments : LLC.revisions).add(savedMark);
        that.showNoteView.render();
        that.showNoteView.showMarks();
      }
    });  
  }
})