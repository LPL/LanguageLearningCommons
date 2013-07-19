PopUpView = Backbone.View.extend({
	// initialize: function(message, type) {
	// 	this.message = message;
	// 	this.type = type;
	// },

	render: function() {
	var that = this;
	
		this.$el.html(JST['PopUp']({
	    message: that.options.text,
	    type: that.options.type
	  }));

	  return that;
	}
});