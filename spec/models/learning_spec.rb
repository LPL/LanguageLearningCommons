require 'spec_helper'

describe Learning do

	describe "presence validations" do

		LEARNING_ATTRS = {:user_id => 1, :language_id => 1}
		LEARNING_ATTRS.each_key do |key|
	    it "is invalid without a #{key.to_s}" do
		  	Learning.new(LEARNING_ATTRS.except(key)).should_not be_valid
	  	end
	  end
	end

	# describe "uniqueness validations" do
	# 	before :each do
	# 		@user = User.create(:name => "llu", :email => "llu@example.com", :password => "123123123")
	# 	end

	# 	it "is invalid if the user is already learning the language" do
	# 		Learning.create(user: @user, language_id: 1)
	# 		Learning.new(user: @user, language_id: 1).should be_invalid
	# 	end

	# 	it "is invalid if the user already knows the language" do
	# 		Knowing.create(user: @user, language_id: 1)
	# 		Learning.new(user: @user, language_id: 1).should be_invalid
	# 	end
	# end
end