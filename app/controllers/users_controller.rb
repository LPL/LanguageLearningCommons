class UsersController < ApplicationController
	def show
    # default to current_user (root routes here)
    debugger
    @user = params[:id].nil? ? current_user : User.find(params[:id])

    @self_page = @user == current_user
    @is_buddy = current_user.buddies.include?(@user)
		@knowings = @user.knowings
		@learnings = @user.learnings
    @notes = @user.notes
    @buddyship_proposal = BuddyshipProposal
      .where(proposing_user_id: @user.id, target_user_id: current_user.id).first
	end

  # def test
  #   @user = current_user
  #   @self_page = @user == current_user
  #   @is_buddy = current_user.buddies.include?(@user)
		# @knowings = @user.knowings
		# @learnings = @user.learnings
  #   @notes = @user.notes
  # end
end