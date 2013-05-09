class RevisionsController < ApplicationController
  def create
    @revision = Revision.new(params[:revision])
    @revision.note_id = params[:note_id]
    @revision.revisor = current_user # ! user_id in params is note_author
    if @revision.save
      render :json => @revision
    else
      render :json => "Note author identity crisis!".to_json
    end
  end
end
