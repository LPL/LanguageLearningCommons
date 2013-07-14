require 'spec_helper'
require 'debugger'
# This should not be necessary. Apparentely a load order problem?
include Capybara::DSL

describe "devise/registrations#edit" do
  before do
    sign_in_as_first_user
    visit '/users/edit'

    find(:xpath, "//input[@id='user_known_language_ids_'][@value='1']").set(true)
    find(:xpath, "//input[@id='user_known_language_ids_'][@value='2']").set(false)
    find(:xpath, "//input[@id='user_known_language_ids_'][@value='3']").set(false)
    find(:xpath, "//input[@id='user_known_language_ids_'][@value='4']").set(false)
    find(:xpath, "//input[@id='user_known_language_ids_'][@value='5']").set(false)
    find(:xpath, "//input[@id='user_known_language_ids_'][@value='6']").set(false)

    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='1']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='2']").set(true)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='3']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='4']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='5']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='6']").set(false)

    click_on("Update Languages")
  end

  it "redirects to the user's profile" do
    current_path.should == "/users/1" # because we sign_in_as_first_user'd
  end

  it "correctly changes languages" do
    # debugger
    find('#knownLanguageList').text.should =~ /Mandarin/
    find('#learningLanguageList').text.should =~ /Spanish/
    # test for not having other language names?
  end
end