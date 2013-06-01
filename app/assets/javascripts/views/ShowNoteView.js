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

    _(marks).each(function(mark) {
      var markRange = document.createRange();
      var noteBodyNode = document.getElementById('noteBodyParentNode').lastChild;
      markRange.setStart(noteBodyNode, mark.get('anchorOffset'));
      markRange.setEnd(noteBodyNode, mark.get('focusOffset'));
      var markSpan = document.createElement("span");
      markSpan.className = mark.get('markType') + " " + mark.get('markType') + mark.id;
      markRange.surroundContents(markSpan);

      var $markedRange = $('.' + mark.get('markType') + mark.id);
      var originalText = $markedRange.html();
      var $markPocket = $('<span class="markPocket"></span>');
      $markedRange.prepend($markPocket);
      that.setReviewListener(that, $markedRange, $markPocket, mark.id, false, originalText);
    });

  },

  setReviewListener: function(that, $reviewedRange, $reviewPocket, markId, isComment, originalText) {
    var that = this;

    $reviewedRange.on('mouseover',
      that.showReviewText.bind(that, $reviewedRange, $reviewPocket, markId, isComment, originalText));
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

  showReviewText: function($reviewedRange, $reviewPocket, markId, isComment, originalText) {
    // var reviewText = isComment ? LLC.comments.get(k).get('body') : LLC.revisions.get(k).get('body')
    var reviewText = isComment ? LLC.comments.get(markId).get('body') : originalText;
    $reviewPocket.append('<span class=' + (isComment ? 'commentText' : 'revisionText') +
      this.reviewTextWidth(reviewText) + '>' + reviewText + '</span>');
    $reviewedRange.on('mouseout', function() {
      $reviewPocket.empty();
    })
  },
})