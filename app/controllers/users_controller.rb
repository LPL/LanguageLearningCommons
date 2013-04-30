class UsersController < ApplicationController
	def show
		@current_user = current_user
		@knowings = @current_user.knowings
		@learnings = @current_user.learnings
    @notes = @current_user.notes
	end
end