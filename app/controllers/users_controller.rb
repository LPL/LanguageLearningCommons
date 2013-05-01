class UsersController < ApplicationController
	def show
    # default to current_user (root routes here)
    @user = params[:id].nil? ? current_user : User.find(params[:id])
    @own_profile = @user == current_user
    @is_buddy = current_user.buddies.include?(@user)
		@knowings = @user.knowings
		@learnings = @user.learnings
    @notes = @user.notes
    #debugger
    #lalala = 9
	end
end