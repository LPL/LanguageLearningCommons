class MarksController < ApplicationController
  def create
    @mark = Mark.new(params[:mark])
    @mark.note_id = params[:note_id]
    @mark.user_id = current_user.id # ! user_id in params is note_author
    if @mark.save
      render :json => @mark
    else
      raise "Note author identity crisis!"
    end
  end
end
