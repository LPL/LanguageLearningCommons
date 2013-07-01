require 'spec_helper'

describe Language do
  
  it "is invalid without a name" do
    Language.new().should be_invalid
  end
  it "is invalid with a duplicate name" do
    Language.create(:name => "Muricanese")
    Language.new(:name => "Muricanese").should be_invalid
  end
end