class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :authenticate_user!#, :except => :root # <- doesn't work--why?

  def suggestion_language(user)
  	if user.known_languages.none? && user.learning_languages.none?
        nil
    elsif user.learning_languages.any?
        {:type => :learning,
         :language => user.learning_languages.first}
    else
    	{:type => :known,
         :language => user.known_languages.first}
    end
  end

  private

  # def authenticate_as_author
  # end

  # def authenticate_as_buddy
  # end
end
