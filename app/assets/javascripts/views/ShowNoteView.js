ShowNoteView = Backbone.View.extend({
  render: function() {
    var that = this;

    $renderedContent = $('<div class="row"></div>')
    this.$el.html(JST['ShowNote']({
      note: that.model.attributes
    }));

    // rangy.init();
    // this.lobnoxClasser = rangy.createCssClassApplier("lobnox", {normalize: true});
    // _(that.model.attributes.comments).each(function(comment) {
    //   var range = rangy.deserializeRange(comment.range)
    //   this.lobnoxClasser.applyToRange(range);
    // })

    return that;
  },

  showComments: function(note) {
    var that = this;

    // var note;
    // if(note == null) {
    //   note =
    // }

    rangy.init();
    var i = 0;
    _.each(LLC.comments.models, function(comment) {
      that.commentStyler = rangy.createCssClassApplier("comment comment" + i);
      var range = rangy.deserializeRange(comment.attributes.range);
      that.commentStyler.applyToRange(range);

      i++;
    })

    var j = 0;
    _.each(LLC.comments.models, function(comment) {
      var $commentedRange =  $('.comment' + j);
      var $commentPocket = $('<span class="commentPocket"></span>');
      $commentedRange.prepend($commentPocket);
      that.setCommentListener(that, $commentedRange, $commentPocket, j);

      j++;
    })
  },

  setCommentListener: function(that, $commentedRange, $commentPocket, j) {
    var that = this;

    $commentedRange.on('mouseover',
      that.showCommentText.bind(that, $commentedRange, $commentPocket, j));
  },

  showCommentText: function($commentedRange, $commentPocket, j) {
    var commentText = LLC.comments.models[j].attributes.body;
    $commentPocket.append('<span class=commentText>' + commentText + '</span>');
    $commentedRange.on('mouseout', function() {
      $commentPocket.empty();
    })
  }//,

  // showRevisions: function(note) {
  //   var that = this;
  //
  //   rangy.init();
  //   var i = 0;
  //   _.each(LLC.revisions.models, function(revision) {
  //     that.revisionStyler = rangy.createCssClassApplier("revision revision" + i);
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