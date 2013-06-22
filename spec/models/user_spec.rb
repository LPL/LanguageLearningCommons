require 'spec_helper'

describe User do

	before do
		@required_user_attrs = {:name => "David", :email => "david@gmail.com", :password => "puppetz901^"}
	end

  it "does not create users missing a required attribute" do
  	@required_user_attrs.each_key do |key|
  		debugger
  		@required_user_attrs.delete(key)
	  	User.create(@required_user_attrs).should raise_error
	  	# this next line would be better handled by the "before" block, but I can't move my
	  	# each_key loop outside of the it block. Hm.
	  	@required_user_attrs = {:name => "David", :email => "david@gmail.com", :password => "puppetz901^"} 
  	end
  end

  it "creates a valid user" do
  	User.create(@required_user_attrs)
  end
end
