class BuddyshipProposalsController < ApplicationController
  def create
    @target_user = User.find(params[:id])
    @buddyship_proposal = BuddyshipProposal
      .create(:proposing_user => current_user, :target_user => @target_user)
    if @buddyship_proposal.save
      flash[:notice] = ("#{@target_user.name} has been sent a buddy" +
                        " proposal on your behalf")
    else
      flash[:error] = "Buddyship proposal failed"
    end
    redirect_to :back
  end

  def destroy
    @other_user = User.find(params[:id])
    @buddyship_proposal =
      BuddyshipProposal.where(proposing_user_id: @other_user.id,
                              target_user_id: current_user.id).first ||
      BuddyshipProposal.where(proposing_user_id: current_user.id,
                              target_user_id: @other_user.id).first
    @buddyship_proposal.destroy
    redirect_to :back
  end
end
