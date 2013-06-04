ShowNoteView = Backbone.View.extend({
  render: function() {
    var that = this;

    this.$el.html(JST['ShowNote']({
      note: that.model.attributes
    }));

    return that;
  },

  showReviews: function() {
    var that = this;

    var marks = [];
    LLC.comments.each(function(comment) {
      marks.push(comment);
    });
    LLC.revisions.each(function(revision) {
      marks.push(revision);
    });

    var reversedMarks = _(marks).sortBy(function(mark) {return -mark.get('startOffset')})

    _(reversedMarks).each(function(mark) {
      var markRange = document.createRange();
      var noteBodyNode = document.getElementById('noteBodyParentNode').firstChild;
      markRange.setStart(noteBodyNode, mark.get('startOffset'));
      markRange.setEnd(noteBodyNode, mark.get('endOffset'));
      var markSpan = document.createElement("span");
      markSpan.className = mark.get('markType') + " " + mark.get('markType') + mark.get('id');
      markRange.surroundContents(markSpan);


      var $markedText = $('.' + mark.get('markType') + mark.get('id'));
      var originalText = $markedText.html();
      $markedText.attr('data-originalLength', originalText.length.toString());
      if(mark.get('markType') == "revision") {
        $markedText.html(mark.get('body'));
      }
      var $markPocket = $('<span class="markPocket"></span>');
      $markedText.prepend($markPocket);
      var isComment = mark.get('markType') == "comment";
      that.setReviewListener(that, $markedText, $markPocket, mark.get('id'), isComment, originalText);
    });

  },

  setReviewListener: function(that, $markedText, $markPocket, markId, isComment, originalText) {
    var that = this;

    $markedText.on('mouseover',
      that.showReviewText.bind(that, $markedText, $markPocket, markId, isComment, originalText));
  },

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
  },

  showReviewText: function($markedText, $markPocket, markId, isComment, originalText) {
    var reviewText = isComment ? LLC.comments.get(markId).get('body') : originalText;
    $markPocket.append('<span class=' + (isComment ? 'commentText' : 'revisionText') +
      this.reviewTextWidth(reviewText) + '>' + reviewText + '</span>');
    $markedText.on('mouseout', function() {
      $markPocket.empty();
    })
  },
})