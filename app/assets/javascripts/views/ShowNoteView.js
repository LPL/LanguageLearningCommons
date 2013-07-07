ShowNoteView = Backbone.View.extend({
  render: function() {
    var that = this;

    this.$el.html(JST['ShowNote']({
      note: that.model.attributes
    }));

    //this.showMarks();

    return that;
  },

  // Find and show all marks.
  showMarks: function() {
    var that = this;

    _(that.reversedMarks()).each(function(mark) {
      that.injectMark(mark);
      that.prepareHoverText(mark);
    });
  },

  reversedMarks: function() {
    // Both comments and revisions are marks.
    var marks = [];
    LLC.comments.each(function(comment) {
      marks.push(comment);
    });
    LLC.revisions.each(function(revision) {
      marks.push(revision);
    });

    // Marks are placed in reverse order so that the DOM node they  
    // are placed in remains the first child in its parent node.
    // (Otherwise their location in the DOM would change.)
    return _(marks).sortBy(function(mark) {
      return -mark.get('startOffset')
    })
  },

  // Insert a mark into the DOM
  injectMark: function(mark) {
    var markRange = this.markRange(mark);
    var markSpan = this.markSpan(mark);
    markRange.surroundContents(markSpan);

    // jQuery starts here--haven't found a way to do the above in jQuery
    mark.set('$markSpan', $(markSpan));
    if(mark.get('markType') == "revision") {
      mark.set('originalText', mark.get('$markSpan').html());
      mark.get('$markSpan').html(mark.get('body'));
      mark.get('$markSpan').attr('data-originalLength', mark.get('originalText').length.toString());
    }
  },

  // Define the Javascript range in the text which contains the mark.
  markRange: function(mark) {
    var noteBodyNode = document.getElementById('noteBodyParentNode').firstChild;
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
    var displayText = mark.get(mark.get('markType') == 'comment' ? 'body' : 'originalText');
    var $displayTextSpan = $('<span class=' + mark.get('markType') + 'Text' +
                            '>' + this.insertLineBreaks(displayText) + '</span>')
    mark.get('$markSpan').prepend($displayTextSpan);
    mark.get('$markSpan').on('mouseout', function() {
      $displayTextSpan.remove();
    })
  },

  // In $displayTextSpan, every 25 characters, insert a line break at the next space.
  // (So long comments won't go off the page.)
  insertLineBreaks: function(displayText) {
    var lineCharacters = 0
    var brokenDisplayText = displayText;
    for(i = 0; i < brokenDisplayText.length; i++) {
      if(brokenDisplayText.substring(i, i+1) == " " && lineCharacters > 25) {
        brokenDisplayText = brokenDisplayText.substring(0, i) + "\n" +
                            brokenDisplayText.substring(i+1, brokenDisplayText.length);
        i++;
        lineCharacters = 0;
      } else {
        lineCharacters += 1;
      }
    }
    return brokenDisplayText;
  }
})