class UserController < ApplicationController
	def show
		@current_user = current_user
		@known_languages = @current_user.known_languages
		@learning_languages = @current_user.learning_languages
	end
end