ShowRevisableNoteView = Backbone.View.extend({

  // Each ShowRevisableNoteView contains a ShowNoteView, adding only a couple DOM elements to it (#revisionButton and #commentButton). They are separated to distinguish rendering functionality from note editing functionality (i.e., creating marks).

  initialize: function(note) {
    this.showNoteView = new ShowNoteView({ model: this.model });
  },

  events: {
    'click #revisionButton': 'launchMark',
    'click #commentButton': 'launchMark'
  },

  render: function() {
    var that = this;

    this.$el.html(this.showNoteView.render({ model: this.model }).$el);
    this.$el.append(JST['ReviseNote']({ note: that.model}));

    return this;
  },

  // Given text selection, create a mark
  launchMark: function(ev) {
    // markType("comment"/"revision") is extracted from the button's id attr
    var markType = ev.target.id.substring(0, ev.target.id.length - 6);
    this.mark = new LLC.Models.Mark({markType: markType});
    this.validateSelection();
  },

  validateSelection: function(markType) {
    var that = this;

    that.selection = window.getSelection();
    // if no text selected
    if(that.selection.rangeCount == 0 || that.selection.type == "Caret") { 
      var highlightReminder = "First highlight the section of text you wish to " +
        (markType == LLC.Models.Comment ? "comment on." : "revise.")
      $('#markForm').html(highlightReminder);
    // if selection outside note body
    } else if(! that.selection.AnchorNode == that.selection.focusNode) {
      console.log("The selection must be within the text of the note.");
    // otherwise, proceed
    } else {
      that.setOffsets(that.selection);
      that.showMarkInput(markType, that.selection);
    }
  },

  // Unlike native ranges, the ranges our marks occupy should never be backwards.
  setOffsets: function(selection) {
    var dynamicOffsetBase = this.dynamicOffsetBase(selection);

    if(selection.anchorOffset < selection.focusOffset) {
      this.mark.set('startOffset',
                    (selection.anchorOffset + dynamicOffsetBase));
      this.mark.set('endOffset',
                    (selection.focusOffset + dynamicOffsetBase));
    } else if(selection.anchorOffset > selection.focusOffset) {
      this.mark.set('startOffset',
                    (selection.focusOffset + dynamicOffsetBase));
      this.mark.set('endOffset',
                    (selection.anchorOffset + dynamicOffsetBase));
    }
  },

  dynamicOffsetBase: function(selection) {
    // Marks' offsets (beginning and end points in the text) need to count all preceeding characters in the note body. When other marks inject their spans into the text, they slice up the DOM node the text is in, altering native offsets. To determine offsets based on the original text (thus not depandant on the presence of preceeding marks) we iterate through all sibling nodes preceeding the selection and sum their characters. Still looking for a worthwhile way to refactor this process.

    var dynamicOffsetBase = 0;
    var currentNode = selection.anchorNode;

    // While there is a preceeding node
    while(currentNode.previousSibling) {
      currentNode = currentNode.previousSibling;
      // if the node is just text, add the characters
      if(currentNode.nodeType == 3) {
        dynamicOffsetBase += currentNode.length;
      // if a revision, add the characters of the original text
      } else if(currentNode.nodeType == 1 && $(currentNode).attr('data-originalLength')) {
        dynamicOffsetBase += parseInt($(currentNode).attr('data-originalLength'));
      // if a comment, add characters as normal
      } else if(currentNode.nodeType == 1) {
        dynamicOffsetBase += $(currentNode).text().length;
      }
    }

    return dynamicOffsetBase;
  },

  showMarkInput: function(markType, selection) {
    var that = this;

    // render text box and save button
    $('#markForm').empty();
    that.$markTextBox = $('<input type="textArea" name="body" id="markTextBox">');
    that.$markSaveButton = $('<button class="btn" id="markSaveButton" type="button">Save</button>');
    $('#markForm').append(that.$markTextBox, that.$markSaveButton);

    // save on enter key up or button click
    that.$markTextBox.keyup(function(ev) {
      if(ev.which == 13) {
        that.saveMark(selection.toString());
      }
    });
    that.$markSaveButton.on('click', that.saveMark.bind(that, selection.toString()));
    that.$markTextBox.focus();
  },

  saveMark: function(originalText) {
    var that = this;

    // set text input
    this.mark.set('body', this.$markTextBox.val());
    $('#markForm').empty();

    // save
    this.mark.save({}, {
      success: function(savedMark) {
        LLC.marks.add(savedMark);
        that.showNoteView.render();
      }
    });  
  }
})