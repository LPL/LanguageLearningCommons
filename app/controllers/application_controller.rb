class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :authenticate_user!#, :except => :root # <- doesn't work--why?

  private

  # def authenticate_as_author
  # end

  # def authenticate_as_buddy
  # end
end
