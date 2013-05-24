class RegistrationsController < Devise::RegistrationsController
  def update
    if params[:commit] == "Update Languages"
      current_user.update_attributes!(
        known_language_ids: params[:user][:known_language_ids],
        learning_language_ids: params[:user][:learning_language_ids])
      redirect_to user_url(current_user)
    else
      super
    end
  end
  def new
    flash[:alert] = "SDDJGsdf s GFg Reg ER Gre gerG"
    super
  end
end
