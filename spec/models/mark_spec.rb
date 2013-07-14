require 'spec_helper'

describe Mark do

	MARK_ATTRS = {:user_id => 1, :note_id => 1}

  MARK_ATTRS.each_key do |key|
    it "is invalid without a #{key.to_s}" do
	  	Mark.new(MARK_ATTRS.except(key)).should_not be_valid
  	end
  end
end
