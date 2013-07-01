require 'spec_helper'

describe Revision do

	REVISION_ATTRS = {:user_id => 1, :note_id => 1}

  REVISION_ATTRS.each_key do |key|
    it "is invalid without a #{key.to_s}" do
	  	Revision.new(REVISION_ATTRS.except(key)).should_not be_valid
  	end
  end
end
