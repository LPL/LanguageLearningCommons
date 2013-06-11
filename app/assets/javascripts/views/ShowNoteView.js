ShowNoteView = Backbone.View.extend({
  render: function() {
    var that = this;

    this.$el.html(JST['ShowNote']({
      note: that.model.attributes
    }));

    //this.showMarks();

    return that;
  },

  showMarks: function() {
    var that = this;

    var marks = [];
    LLC.comments.each(function(comment) {
      marks.push(comment);
    });
    LLC.revisions.each(function(revision) {
      marks.push(revision);
    });

    // marks are placed in reverse order so that the DOM node they  
    // are placed in remains the first child in its parent node
    var reversedMarks = _(marks).sortBy(function(mark) {
      return -mark.get('startOffset')
    })

    _(reversedMarks).each(function(mark) {
      that.injectMark(mark);
      that.prepareHoverText(mark);
    });

  },

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

  markRange: function(mark) {
    var noteBodyNode = document.getElementById('noteBodyParentNode').firstChild;
    var markRange = document.createRange();
    markRange.setStart(noteBodyNode, mark.get('startOffset'));
    markRange.setEnd(noteBodyNode, mark.get('endOffset'));
    return markRange;
  },

  markSpan: function(mark) {
    var markSpan = document.createElement("span");
    markSpan.className = mark.get('markType') + " " + mark.get('markType') + mark.get('id');
    return markSpan;
  },

  prepareHoverText: function(mark) {
    var that = this;
    
    mark.set('$markPocket', $('<span class="markPocket"></span>'));
    mark.get('$markSpan').prepend(mark.get('$markPocket'));
    mark.get('$markSpan').on('mouseover',
      that.showHoverText.bind(that, mark));
  },

  showHoverText: function(mark) {
    var displayText = mark.get(mark.get('markType') == 'comment' ? 'body' : 'originalText');

    mark.get('$markPocket').append('<span class=' + (mark.get('markType') == 'comment' ? 'commentText' : 'revisionText') +
      this.reviewTextWidth(displayText) + '>' + displayText + '</span>');
    mark.get('$markSpan').on('mouseout', function() {
      mark.get('$markPocket').empty();
    })
  },

  // below: functions to determine width of hover text element.

  maxWordLength: function(reviewText) {
        maxWordLength = 0;
    consecutiveNonWhitespaceChar = 0;
    for(i = 0; i < reviewText.length; i++) {
      if(reviewText.substring(i, i+1) == " ") {
        if(consecutiveNonWhitespaceChar > maxWordLength) {
          maxWordLength = consecutiveNonWhitespaceChar;
        }
        consecutiveNonWhitespaceChar = 0;
      } else {
        consecutiveNonWhitespaceChar++;
      }
    }
    if(consecutiveNonWhitespaceChar > maxWordLength) {
      maxWordLength = consecutiveNonWhitespaceChar;
    }

    // constant accounts for em not being average character length
    return maxWordLength * 0.6;
  },

  widthGuess: function(reviewText) {
    if(reviewText.length < 31) {
      return (reviewText.length * 0.3);
    } else {
      return (reviewText.length * 0.3)/(Math.floor(reviewText.length/30));
    }
  },

  reviewTextWidth: function(reviewText) {

    maxWordLength = this.maxWordLength(reviewText);
    widthGuess = this.widthGuess(reviewText);

    if(widthGuess < maxWordLength) {
      return ' style="width: ' + maxWordLength + 'em"';
    } else {
      return ' style="width: ' + widthGuess + 'em"';
    }
  }
})