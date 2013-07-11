def sign_in_as_first_user
	visit "/users/sign_in"
    fill_in("Username or email", :with => User.find(1).name)
    fill_in("Password", :with => "123123123")
    click_on("Sign in")
end