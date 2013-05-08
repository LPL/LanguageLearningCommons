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

    // var i = 0;
    LLC.comments.each(function(comment) {
      that['commentStyler' + comment.id] = rangy.createCssClassApplier("comment comment" + comment.id);
      var range = rangy.deserializeRange(comment.attributes.range);
      that['commentStyler' + comment.id].applyToRange(range);

      // i++;
    })

    // var m = 0;
    LLC.revisions.each(function(revision) {
      that['revisionStyler' + revision.id] = rangy.createCssClassApplier("revision revision" + revision.id);
      var range = rangy.deserializeRange(revision.attributes.range);
      that['revisionStyler' + revision.id].applyToRange(range);

      // m++;
    })

    // var j = 0;
    LLC.comments.each(function(comment) {
      var $commentedRange =  $('.comment' + comment.id);
      var $commentPocket = $('<span class="commentPocket"></span>');
      $commentedRange.prepend($commentPocket);
      that.setReviewListener(that, $commentedRange, $commentPocket, comment.id, true);

      // j++;
    })

    // var n = 0;
    LLC.revisions.each(function(revision) {
      var $revisionedRange =  $('.revision' + revision.id);
      var $revisionPocket = $('<span class="revisionPocket"></span>');
      $revisionedRange.prepend($revisionPocket);
      that.setReviewListener(that, $revisionedRange, $revisionPocket, revisionId, false);

      // n++;
    })

    // var i = 0;
    // _.each(LLC.comments.models, function(comment) {
    //   that['commentStyler' + comment.id] = rangy.createCssClassApplier("comment comment" + comment.id);
    //   var range = rangy.deserializeRange(comment.attributes.range);
    //   that['commentStyler' + comment.id].applyToRange(range);
    //
    //   i++;
    // })
    //
    // var m = 0;
    // _.each(LLC.revisions.models, function(revision) {
    //   that['revisionStyler' + m] = rangy.createCssClassApplier("revision revision" + m);
    //   var range = rangy.deserializeRange(revision.attributes.range);
    //   that['revisionStyler' + m].applyToRange(range);
    //
    //   m++;
    // })
    //
    // var j = 0;
    // _.each(LLC.comments.models, function(comment) {
    //   var $commentedRange =  $('.comment' + comment.id);
    //   var $commentPocket = $('<span class="commentPocket"></span>');
    //   $commentedRange.prepend($commentPocket);
    //   that.setReviewListener(that, $commentedRange, $commentPocket, j, true);
    //
    //   j++;
    // })
    //
    // var n = 0;
    // _.each(LLC.revisions.models, function(revision) {
    //   var $revisionedRange =  $('.revision' + n);
    //   var $revisionPocket = $('<span class="revisionPocket"></span>');
    //   $revisionedRange.prepend($revisionPocket);
    //   that.setReviewListener(that, $revisionedRange, $revisionPocket, n, false);
    //
    //   n++;
    // })

  },

  setReviewListener: function(that, $reviewedRange, $reviewPocket, commentId, isComment) {
    var that = this;

    $reviewedRange.on('mouseover',
      that.showReviewText.bind(that, $reviewedRange, $reviewPocket, commentId, isComment));
  },

  showReviewText: function($reviewedRange, $reviewPocket, commentId, isComment) {
    // var reviewText = isComment ? LLC.comments.get(k).get('body') : LLC.revisions.get(k).get('body')
    var reviewText = isComment ? LLC.comments.get(commentId).get('body') : LLC.revisions.models[commentId].attributes.body
    $reviewPocket.append('<span class=reviewText>' + reviewText + '</span>');
    $reviewedRange.on('mouseout', function() {
      $reviewPocket.empty();
    })
  },
})