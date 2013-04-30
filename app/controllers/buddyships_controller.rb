class BuddyshipsController < ApplicationController
  def create
    current_user.bebuddy(User.find(params[:id]))
    redirect_to "users/#{params[:id]}"
  end

  def destroy
    current_user.unbuddy(User.find(params[:id]))
    redirect_to "users/#{params[:id]}"
  end
end
