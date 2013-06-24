require 'spec_helper'

describe Knowing do

	before :each do
		@user = User.create(:name => "klu", :email => "klu@example.com", :password => "123123123")
	end

	it "is invalid if the user already knows the language" do
		Knowing.create(user: @user, language_id: 1)
		Knowing.new(user: @user, language_id: 1).should be_invalid
	end

	it "is invalid if the user is already learning the language" do
		Learning.create(user: @user, language_id: 1)
		Knowing.new(user: @user, language_id: 1).should be_invalid
	end
end