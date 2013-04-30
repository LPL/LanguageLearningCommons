class LearningsController < ApplicationController
  def show
    @learning = Learning.find(params[:id])
    @user = @learning.user
    @language = @learning.language
  end
end
