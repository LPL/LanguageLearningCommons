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
    
    mark.get('$markSpan').on('mouseover',
      that.showHoverText.bind(that, mark));
  },

  showHoverText: function(mark) {
    var displayText = mark.get(mark.get('markType') == 'comment' ? 'body' : 'originalText');
    var $displayTextSpan = $('<span class=' + mark.get('markType') + 'Text' +
                            '>' + this.insertLineBreaks(displayText) + '</span>')
    mark.get('$markSpan').prepend($displayTextSpan);
    mark.get('$markSpan').on('mouseout', function() {
      $displayTextSpan.remove();
    })
  },

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