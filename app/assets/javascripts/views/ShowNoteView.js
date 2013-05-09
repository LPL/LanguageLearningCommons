ShowNoteView = Backbone.View.extend({
  render: function() {
    var that = this;

    // $renderedContent = $('<div class="row"></div>')
    this.$el.html(JST['ShowNote']({
      note: that.model.attributes
    }));


    // $($el).find()
    // rangy.init();
    // this.lobnoxClasser = rangy.createCssClassApplier("lobnox", {normalize: true});
    // _(that.model.attributes.comments).each(function(comment) {
    //   var range = rangy.deserializeRange(comment.range)
    //   this.lobnoxClasser.applyToRange(range);
    // })

    return that;
  },

  showReviews: function() {
    var that = this;

    rangy.init();

    // this.markQueue = [];
    // LLC.comments.each(function(comment) {that.markQueue.push(comment)} )
    // LLC.revisions.each(function(revision) {that.markQueue.push(revision)} )
    //
    // _(this.markQueue).each(function(mark) {
    //   console.log("reviewType: " + mark.get('reviewType'));
    //   var markType = mark.get('reviewType');
    //   var mark_class = (markType.toString() + " " + markType + mark.id);
    //   that[markType + 'Styler' + mark.id] = rangy.createCssClassApplier(mark_class);
    //   var range = rangy.deserializeRange(mark.get('range'));
    //   that[markType + 'Styler' + mark.id].applyToRange(range);
    // })

    LLC.comments.each(function(comment) {
      that['commentStyler' + comment.id] = rangy.createCssClassApplier("comment comment" + comment.id);
      var range = rangy.deserializeRange(comment.attributes.range);
      that['commentStyler' + comment.id].applyToRange(range);
    })

    LLC.revisions.each(function(revision) {
      that['revisionStyler' + revision.id] = rangy.createCssClassApplier("revision revision" + revision.id);
      var range = rangy.deserializeRange(revision.attributes.range);
      that['revisionStyler' + revision.id].applyToRange(range);
    })

    LLC.comments.each(function(comment) {
      var $commentedRange =  $('.comment' + comment.id);
      var $commentPocket = $('<span class="commentPocket"></span>');
      $commentedRange.prepend($commentPocket);
      that.setReviewListener(that, $commentedRange, $commentPocket, comment.id, true);
    })

    LLC.revisions.each(function(revision) {
      var $revisionedRange =  $('.revision' + revision.id);
      var $revisionPocket = $('<span class="revisionPocket"></span>');
      $revisionedRange.prepend($revisionPocket);
      that.setReviewListener(that, $revisionedRange, $revisionPocket, revision.id, false);
    })

  },

  setReviewListener: function(that, $reviewedRange, $reviewPocket, markId, isComment) {
    var that = this;

    $reviewedRange.on('mouseover',
      that.showReviewText.bind(that, $reviewedRange, $reviewPocket, markId, isComment));
  },

  showReviewText: function($reviewedRange, $reviewPocket, markId, isComment) {
    // var reviewText = isComment ? LLC.comments.get(k).get('body') : LLC.revisions.get(k).get('body')
    var reviewText = isComment ? LLC.comments.get(markId).get('body') : LLC.revisions.get(markId).get('body')
    $reviewPocket.append('<span class=reviewText>' + reviewText + '</span>');
    $reviewedRange.on('mouseout', function() {
      $reviewPocket.empty();
    })
  },
})