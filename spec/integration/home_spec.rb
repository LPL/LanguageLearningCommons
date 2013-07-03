require 'spec_helper'
require 'debugger'
# This should not be necessary. Apparentely a load order problem?
include Capybara::DSL

describe "login" do
  it "lets a user sign in" do
  	Capybara.reset_sessions!
    visit "/users/sign_in"
    fill_in("Username or email", :with => User.find(1).name)
    fill_in("Password", :with => "123123123")
    click_on("Sign in")
    visit "/users/2"
    current_path.should == "/users/2"
  end
  it "roots an authenticated user to their user_path" do
  	Capybara.reset_sessions!
    visit "/users/sign_in"
    fill_in("Username or email", :with => User.find(1).name)
    fill_in("Password", :with => "123123123")
    click_on("Sign in")
    visit "/"
    current_path.should == "/users/1"
  end
  it "roots an unauthenticated user to the welcome page" do
  	Capybara.reset_sessions!
    visit "/"
    page.has_content?("welcome")
  end
  it "redirects unauthenticated users trying to access content to the sign in page" do
  	Capybara.reset_sessions!
    visit "/users/1"
    current_path.should == "/users/sign_in"
  end
end