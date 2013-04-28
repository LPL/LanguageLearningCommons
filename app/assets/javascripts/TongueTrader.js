TT = {
	insert_current_user_known_languages_view = function($container) {
		cuklv = new CurrentUserKnownLanguagesView({

		});
		$container.html(cuklv.render().$el);
	}

	insert_current_user_learning_languages_view = function() {}
}