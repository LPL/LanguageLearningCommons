class BuddyshipProposalsController < ApplicationController
  def create
    @target_user = User.find(params[:id])
    @buddyship_proposal = BuddyshipProposal.create(:proposing_user => current_user,
                             :target_user => @target_user)
    if @buddyship_proposal.save
      flash[:notice] = ("#{@target_user.name} has been sent a buddy" +
                        " proposal on your behalf")
    redirect_to user_url(@target_user)
    else
      flash[:error] = "Buddyship proposal failed"
    end
  end
end
