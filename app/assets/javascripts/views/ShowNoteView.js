ShowNoteView = Backbone.View.extend({
  render: function() {
    var that = this;

    this.$el.html(JST['ShowNote']({
      note: that.model.attributes
    }));

    // Make sure the template rendering finishes before calling showMarks (because showMarks manipulates the rendered elements)
    setTimeout(function() {
        that.showMarks();
    }, 0);

    return that;
  },

  showMarks: function() {
    var that = this;

    _(that.reversedMarks()).each(function(mark) {
      that.injectMark(mark);
      that.prepareHoverText(mark);
    });
  },

  reversedMarks: function() {
    // Marks are placed in reverse order so that the DOM node they are placed in remains the first child in its parent node. (Otherwise their location in the DOM would change.)
    return LLC.marks.sortBy(function(mark) {
      return -mark.get('startOffset')
    })
  },

  // Insert a mark into the DOM
  injectMark: function(mark) {
    var markRange = this.markRange(mark);
    var markSpan = this.markSpan(mark);
    markRange.surroundContents(markSpan);

    mark.set('$markSpan', $(markSpan));
    // Revisions replace text with the revision body attribute, and reveal the original on hover.
    if(mark.get('markType') == "revision") {
      mark.set('originalText', mark.get('$markSpan').html());
      mark.get('$markSpan').html(mark.get('body'));
      mark.get('$markSpan').attr('data-originalLength',
        mark.get('originalText').length.toString());
    }
  },

  // Recreate the Javascript range containing the marked text.
  markRange: function(mark) {
    var noteBodyNode = document.getElementById('noteBodyParentNode')
                               .firstChild;
    var markRange = document.createRange();
    markRange.setStart(noteBodyNode, mark.get('startOffset'));
    markRange.setEnd(noteBodyNode, mark.get('endOffset'));
    return markRange;
  },

  // Create a span with which to surround the range.
  markSpan: function(mark) {
    var markSpan = document.createElement("span");
    markSpan.className = mark.get('markType') + " " + mark.get('markType') + mark.get('id');
    return markSpan;
  },

  // Listener
  prepareHoverText: function(mark) {
    var that = this;
    
    mark.get('$markSpan').on('mouseover',
      that.showHoverText.bind(that, mark));
  },

  // On hover, show $displayTextSpan
  showHoverText: function(mark) {
    var displayText = mark.get(mark.get('markType') == 'comment' ?
      'body' : 'originalText');
    var $displayTextSpan = $('<span class=' + mark.get('markType') + 'Text>' +
                             this.insertLineBreaks(displayText) + '</span>')
    mark.get('$markSpan').prepend($displayTextSpan);
    // and get ready to remove it
    mark.get('$markSpan').on('mouseout', function() {
      $displayTextSpan.remove();
    })
  },

  // In $displayTextSpan, every 25 characters, insert a line break at the next space. (So long comments won't go off the page.)
  insertLineBreaks: function(displayText) {
    var lineCharacters = 0
    var brokenDisplayText = displayText;
    for(i = 0; i < brokenDisplayText.length; i++) {
      // if it's been 25 chars and the current char is a space
      if(lineCharacters > 25 && brokenDisplayText.substring(i, i+1) == " ") {
        // replace the space with a new line
        brokenDisplayText = brokenDisplayText.substring(0, i) + "\n" +
                            brokenDisplayText.substring(i+1, brokenDisplayText.length);
        i++;
        // and reset
        lineCharacters = 0;
      } else {
        lineCharacters += 1;
      }
    }
    return brokenDisplayText;
  }
});
