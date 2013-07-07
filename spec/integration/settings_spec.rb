require 'spec_helper'
require 'debugger'
require 'launchy'
# This should not be necessary. Apparentely a load order problem?
include Capybara::DSL

describe "devise/registrations#edit" do
  before do
    visit "/users/sign_in"
    fill_in("Username or email", :with => User.find(1).name)
    fill_in("Password", :with => "123123123")
    click_on("Sign in")
  end

  it "sets languages" do
    visit '/users/edit'

    debugger
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='1']").set(true)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='2']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='3']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='4']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='5']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='6']").set(false)

    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='1']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='2']").set(true)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='3']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='4']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='5']").set(false)
    find(:xpath, "//input[@id='user_learning_language_ids_'][@value='6']").set(false)

    click_on("Update Languages")

    save_and_open_page
  end
end