PopUpView = Backbone.View.extend({
	initialize: function(message, type) {
		this.message = message;
		this.type = type;
	},

	render: function() {
	var that = this;
	
		this.$el.html(JST['PopUp']({
	    message: that.message,
	    type: that.type
	  }));

	  return that;
	}
});