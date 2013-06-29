class ApplicationController < ActionController::Base
  protect_from_forgery

  # In addition to Devise views, the welcome layout (landing page) is
  # accessible to non-authenticated users.
  before_filter :authenticate_user!, :except => [:welcome]

  # Root routes here.
  def welcome
    if signed_in?
      redirect_to user_url(current_user)
    else
      render 'layouts/welcome', :layout => nil
    end
  end

  # # Used to suggest user actions after an account is created.
  # def suggestion_language(user)
  # 	if user.known_languages.none? && user.learning_languages.none?
  #       nil
  #   elsif user.learning_languages.any?
  #       {:type => :learning,
  #        :language => user.learning_languages.first}
  #   else
  #   	{:type => :known,
  #        :language => user.known_languages.first}
  #   end
  # end

  private
  # def authenticate_as_author
  # end

  # def authenticate_as_buddy
  # end
end
