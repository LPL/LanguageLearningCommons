require 'spec_helper'

describe User do

  	REQUIRED_ATTRS = {:name => "Fja5kd2l6s", :email => "Fja5kd2l6s@gmail.com", :password => "Fja5kd2l6s"}

    REQUIRED_ATTRS.each_key do |key|
      it "is invalid without a #{key.to_s}" do
  	  	User.new(REQUIRED_ATTRS.except(key)).should_not be_valid
    	end
    end

    describe "uniqueness validations" do

      before :all do        
        User.create(REQUIRED_ATTRS)
      end

      before do
        @nonunique_user = User.new(:name => "E663f357f", :email => "E663f357f@gmail.com", :password => "E663f357f")
      end

      [:name, :email].each do |attribute|
        it "is invalid without a unique #{attribute}" do
          @nonunique_user[attribute] = REQUIRED_ATTRS[attribute]
          @nonunique_user.should_not be_valid
        end
      end
    end

    it "creates a valid user" do
    	User.create(REQUIRED_ATTRS)
    end

    it "capitalizes"
end
