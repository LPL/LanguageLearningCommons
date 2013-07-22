ShowRevisableNoteView = Backbone.View.extend({

  // Each ShowRevisableNoteView contains a ShowNoteView, to which it appends a couple DOM elements (#revisionButton and #commentButton). The views are separated to distinguish rendering functionality from note editing functionality (i.e., creating marks).

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

    // Find all nodes containing text from the note (child nodes of the noteBodyParentNode for unmarked text, or the first child of a $markSpan for marked text)
    var noteNodes = document.getElementById('noteBodyParentNode').childNodes;
    var noteTextNodes = _(noteNodes).map(function(n) { 
      return (n.childNodes[0] || n)
    });

    if(that.selection.rangeCount == 0 || that.selection.type == "Caret") { 
      var highlightReminder = "First highlight the text you wish to " +
        (that.mark.get('markType') == "comment" ? "comment on." : "revise.")
      LLC.popUp({notice: highlightReminder});
    // if selection outside note body
    } else if( (! _(noteTextNodes).include(that.selection.anchorNode)) ||
               (! _(noteTextNodes).include(that.selection.focusNode))     ) {
      LLC.popUp({notice: "You may only select text in the body of the note."});
    // if selection intersects other marks
    }else if(that.selection.anchorNode != that.selection.focusNode) {
      LLC.popUp({notice: "Your selection may not overlap with existing marks."});
    // otherwise, proceed
    } else {
      that.setOffsets(that.selection);
      that.showMarkInput(markType, that.selection);
    }
  },

  // Unlike native ranges, the ranges our marks occupy should never be backwards.
  setOffsets: function(selection) {
    var offsetBase = this.offsetBase(selection);
    var anchorWithBase = selection.anchorOffset + offsetBase
    var focusWithBase = selection.focusOffset + offsetBase

    if(selection.anchorOffset < selection.focusOffset) {
      this.mark.set({'startOffset': anchorWithBase,
                     'endOffset':   focusWithBase   });
    } else if(selection.anchorOffset > selection.focusOffset) {
      this.mark.set({'startOffset': focusWithBase,
                     'endOffset':   anchorWithBase  });
    }
  },

  offsetBase: function(selection) {
    // Marks' offsets (beginning and end points in the text) are based on preceeding characters in the note body. When other marks inject their spans into the text, they slice up the DOM node the text is in, altering native offsets. To determine offsets based on the original text, we iterate through all sibling nodes preceeding the selection and sum their characters. (Looking for a worthwhile way to refactor this process.)

    var offsetBase = 0;
    var currentNode = selection.anchorNode;

    // While there is a preceeding node
    while(currentNode.previousSibling) {
      currentNode = currentNode.previousSibling;
      // if the node is just text, add the characters
      if(currentNode.nodeType == 3) {
        offsetBase += currentNode.length;
      // if a revision, add the characters of the ORIGINAL text
      } else if(currentNode.nodeType == 1 && $(currentNode).attr('data-originalLength')) {
        offsetBase += parseInt($(currentNode).attr('data-originalLength'));
      // if a comment, add characters as normal
      } else if(currentNode.nodeType == 1) {
        offsetBase += $(currentNode).text().length;
      }
    }

    return offsetBase;
  },

  showMarkInput: function(markType, selection) {
    var that = this;

    // render text box and save button
    $('#markForm').empty();
    // (for revisons, insert selected text into text input)
    that.$markTextBox = $('<input type="textArea" name="body" id="markTextBox"' +
      (that.mark.get('markType') == 'revision' ?
        (' value="' + that.selection.toString() + '"') : '')
      + '>' 
    );
    
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

    // save the mark
    this.mark.save({}, {
      success: function(savedMark) {
        LLC.marks.add(savedMark);
        // show the new mark
        that.showNoteView.render();
      }
    });  
  }
})