require 'spec_helper'

describe Buddyship do

	describe "presence validations" do
		BUDDYSHIP_ATTRS = {:user_id => 1, :buddy_id => 1}

	  BUDDYSHIP_ATTRS.each_key do |key|
	    it "is invalid without a #{key.to_s}" do
		  	Buddyship.new(BUDDYSHIP_ATTRS.except(key)).should be_invalid
	  	end
	  end
	end

	it "has a unique user/buddy combination" do
		Buddyship.create(:user_id => 888, :buddy_id => 999)
		Buddyship.new(:user_id => 888, :buddy_id => 999).should be_invalid
	end
end
