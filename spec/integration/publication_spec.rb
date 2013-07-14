require 'spec_helper'
require 'debugger'
# This should not be necessary. Apparently a load order problem?
include Capybara::DSL

describe "note publication" do
  before do
    sign_in_as_first_user
    visit '/users/1/notes/new/'
    @note_title = SecureRandom.base64(8)
    fill_in 'note_title', :with => @note_title
    fill_in 'note_body', :with => @note_title
    click_on 'Publish'
  end

  it "publishes a note" do
    visit '/users/1/notes/'
    sleep 0.2
    page.all('.noteTitle').select {|el| el.text =~ /#{@note_title}/}.length.should == 1
  end
end

# Having trouble saving a comment in a test.
# How to select/highlight text in Capybara/Selenium?
# Capybara doesn't see HTML created by Backbone, only my Rails views

# describe "marking" do
  # it "saves and displays a comment" do
  #   sign_in_as_first_user
  #   commentText = SecureRandom.base64(8)
  #   visit '/users/7/notes/9/'
  #   debugger

  #   click_on '#commentButton'
  #   fill_in 'markTextBox', :with => commentText
  #   click_on '#markSaveButton'
  # end
# end