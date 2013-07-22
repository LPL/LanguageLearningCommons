PopUpView = Backbone.View.extend({
	render: function() {
	var that = this;
	
		this.$el.html(JST['PopUp']({
	    message: that.options.text,
	    type: that.options.type
	  }));

		$(this.$el.children()[0]).on("click", function () {
			that.$el.html("");
		});

	  return that;
	}
});