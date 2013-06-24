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

  it "capitalizes a user's name on create" do
    uncapitalized_user = User.new(:name => "ucu", :email => "ucu@example.com", :password => "123123123")
    uncapitalized_user.save
    uncapitalized_user.name.should == "Ucu"
  end

  describe "#bebuddy and #unbuddy" do

    before do
      @user1 = User.create(:name => "bbu1", :email => "bbu1@example.com", :password => "123123123")
      @user2 = User.create(:name => "bbu2", :email => "bbu2@example.com", :password => "123123123")
      @user1.bebuddy(@user2)
    end

    it "creates reciprocal buddyship records" do
      Buddyship.where(user_id: @user1.id, buddy_id: @user2.id).length.should == 1
      Buddyship.where(user_id: @user2.id, buddy_id: @user1.id).length.should == 1
    end

    it "destroys reciprocal buddyship records" do
      @user1.unbuddy(@user2)
      Buddyship.where(user_id: @user1.id, buddy_id: @user2.id).length.should == 0
      Buddyship.where(user_id: @user2.id, buddy_id: @user1.id).length.should == 0
    end
  end

  describe "#notes_by_language" do

    before :all do
      @user = User.create!(:name => "nblu", :email => "nblu@example.com", :password => "123123123",
                          :learning_language_ids => [1, 2, 3], :known_language_ids => [4])
      @note1 = Note.create(:title => "t1", :body => "b1", :author_id => @user.id, :language_id => 1)
      @note2 = Note.create(:title => "t2", :body => "b2", :author_id => @user.id, :language_id => 1)
      @note3 = Note.create(:title => "t3", :body => "b3", :author_id => @user.id, :language_id => 2)
      @notes_by_language = @user.notes_by_language
    end

    # I feel like there's a better way to do this, but without the after, the test db must be reset
    # between  runs.
    after :all do
      @user.destroy
      @note1.destroy
      @note2.destroy
      @note3.destroy
    end

    it "should contain a hash with languages as keys and arrays of notes as values" do
      @notes_by_language[:noted][Language.find(1)].should == [@note1, @note2]
      @notes_by_language[:noted][Language.find(2)].should == [@note3]
    end

    it "should contain an array of learning languages without notes" do
      @notes_by_language[:noteless].should == [Language.find(3)]
    end

    it "should not include duplicate or known languages" do
      @notes_by_language[:noted].length.should == 2
      @notes_by_language[:noteless].length.should == 1
    end
  end
end
