require 'spec_helper'

describe Note do

	NOTE_ATTRS = {:author => User.first, :title => "t1", :body => "b1"}

  NOTE_ATTRS.each_key do |key|
    it "is invalid without a #{key.to_s}" do
	  	Note.new(NOTE_ATTRS.except(key)).should_not be_valid
  	end
  end
end
