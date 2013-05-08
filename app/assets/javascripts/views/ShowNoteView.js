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

    var i = 0;
    _.each(LLC.comments.models, function(comment) {
      that['commentStyler' + comment.id] = rangy.createCssClassApplier("comment comment" + comment.id);
      var range = rangy.deserializeRange(comment.attributes.range);
      that['commentStyler' + comment.id].applyToRange(range);

      i++;
    })

    var m = 0;
    _.each(LLC.revisions.models, function(revision) {
      that['revisionStyler' + m] = rangy.createCssClassApplier("revision revision" + m);
      var range = rangy.deserializeRange(revision.attributes.range);
      that['revisionStyler' + m].applyToRange(range);

      m++;
    })

    var j = 0;
    _.each(LLC.comments.models, function(comment) {
      var $commentedRange =  $('.comment' + comment.id);
      var $commentPocket = $('<span class="commentPocket"></span>');
      $commentedRange.prepend($commentPocket);
      that.setReviewListener(that, $commentedRange, $commentPocket, j, true);

      j++;
    })

    var n = 0;
    _.each(LLC.revisions.models, function(revision) {
      var $revisionedRange =  $('.revision' + n);
      var $revisionPocket = $('<span class="revisionPocket"></span>');
      $revisionedRange.prepend($revisionPocket);
      that.setReviewListener(that, $revisionedRange, $revisionPocket, n, false);

      n++;
    })
  },

  setReviewListener: function(that, $reviewedRange, $reviewPocket, k, isComment) {
    var that = this;

    $reviewedRange.on('mouseover',
      that.showReviewText.bind(that, $reviewedRange, $reviewPocket, k, isComment));
  },

  showReviewText: function($reviewedRange, $reviewPocket, k, isComment) {
    // var reviewText = isComment ? LLC.comments.get(k).get('body') : LLC.revisions.get(k).get('body')
    var reviewText = isComment ? LLC.comments.models[k].attributes.body : LLC.revisions.models[k].attributes.body
    $reviewPocket.append('<span class=reviewText>' + reviewText + '</span>');
    $reviewedRange.on('mouseout', function() {
      $reviewPocket.empty();
    })
  },

  // showComments: function(note) {
  //   var that = this;
  //
  //   // var note;
  //   // if(note == null) {
  //   //   note =
  //   // }
  //
  //   rangy.init();
  //   var i = 0;
  //   _.each(LLC.comments.models, function(comment) {
  //     that.commentStyler = rangy.createCssClassApplier("comment comment" + i);
  //     var range = rangy.deserializeRange(comment.attributes.range);
  //     that.commentStyler.applyToRange(range);
  //
  //     i++;
  //   })
  //
  //   var j = 0;
  //   _.each(LLC.comments.models, function(comment) {
  //     var $commentedRange =  $($el).find('.comment' + j);
  //     var $commentPocket = $('<span class="commentPocket"></span>');
  //     $commentedRange.prepend($commentPocket);
  //     that.setCommentListener(that, $commentedRange, $commentPocket, j);
  //
  //     j++;
  //   })
  // },
  //
  // setCommentListener: function(that, $commentedRange, $commentPocket, j) {
  //   var that = this;
  //
  //   $commentedRange.on('mouseover',
  //     that.showCommentText.bind(that, $commentedRange, $commentPocket, j));
  // },
  //
  // showCommentText: function($commentedRange, $commentPocket, j) {
  //   var commentText = LLC.comments.models[j].attributes.body;
  //   $commentPocket.append('<span class=commentText>' + commentText + '</span>');
  //   $commentedRange.on('mouseout', function() {
  //     $commentPocket.empty();
  //   })
  // },
  //
  // showRevisions: function(note) {
  //   var that = this;
  //
  //   rangy.init();
  //   var i = 0;
  //   _.each(LLC.revisions.models, function(revision) {
  //     that.revisionStyler = rangy.createCssClassApplier("revision revision" + i);
  //     console.log(revision.attributes.range);
  //     var range = rangy.deserializeRange(revision.attributes.range);
  //     that.revisionStyler.applyToRange(range);
  //
  //     i++;
  //   })
  //
  //   var j = 0;
  //   _.each(LLC.revisions.models, function(revision) {
  //     var $revisionedRange =  $('.revision' + j);
  //     var $revisionPocket = $('<span class="revisionPocket"></span>');
  //     $revisionedRange.prepend($revisionPocket);
  //     that.setRevisionListener(that, $revisionedRange, $revisionPocket, j);
  //
  //     j++;
  //   })
  // },
  //
  // setRevisionListener: function(that, $revisionedRange, $revisionPocket, j) {
  //   var that = this;
  //
  //   $revisionedRange.on('mouseover',
  //     that.showRevisionText.bind(that, $revisionedRange, $revisionPocket, j));
  // },
  //
  // showRevisionText: function($revisionedRange, $revisionPocket, j) {
  //   var revisionText = LLC.revisions.models[j].attributes.body;
  //   $revisionPocket.append('<span class=revisionText>' + revisionText + '</span>');
  //   $revisionedRange.on('mouseout', function() {
  //     $revisionPocket.empty();
  //   })
  // }
})