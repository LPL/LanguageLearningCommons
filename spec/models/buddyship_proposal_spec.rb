require 'spec_helper'

describe BuddyshipProposal do
	it "has a unique user/buddy combination" do
		BuddyshipProposal.create(:proposing_user_id => 888, :target_user_id => 999)
		BuddyshipProposal.new(:proposing_user_id => 888, :target_user_id => 999).should be_invalid
	end
end
