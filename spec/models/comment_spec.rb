require 'spec_helper'

describe Comment do

	COMMENT_ATTRS = {:user_id => 1, :note_id => 1}

  COMMENT_ATTRS.each_key do |key|
    it "is invalid without a #{key.to_s}" do
	  	Comment.new(COMMENT_ATTRS.except(key)).should_not be_valid
  	end
  end
end
