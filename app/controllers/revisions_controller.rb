class RevisionsController < ApplicationController
  # def new
  #   @note = Note.find(params[:id])
  #   @revision = Revision.new
  #   @revision.commentary = @note.body
  # end

  def create
    @revision = Revision.create(params[:revision])
    if @revision.save!
      redirect_to revision_url(@revision)
    else
      flash[:error] = "Revision failed to save."
      @note = Note.find(params[:note_id])
      render :new
    end
  end

  # def show
  #   @revision = Revision.find(params[:id])
  # end

  def index
  end
end
