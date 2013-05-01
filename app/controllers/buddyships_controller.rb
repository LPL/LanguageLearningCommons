class BuddyshipsController < ApplicationController
  def create
    @other_user = User.find(params[:id])
    current_user.bebuddy(@other_user)
    # assumes @other_user proposed to current_user
    @buddyship_proposal =
      BuddyshipProposal.where(proposing_user_id: @other_user.id,
                              target_user_id: current_user.id).first
    @buddyship_proposal.destroy
    redirect_to :back
  end

  def destroy
    current_user.unbuddy(User.find(params[:id]))
    redirect_to :back
  end
end
