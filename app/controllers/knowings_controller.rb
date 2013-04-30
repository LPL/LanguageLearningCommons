class KnowingsController < ApplicationController
  def show
    @knowing = Knowing.find(params[:id])
    @user = @knowing.user
    @language = @knowing.language
  end
end
