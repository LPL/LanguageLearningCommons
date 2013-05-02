class NotesController < ApplicationController
  def new
    @author = current_user
    @note = Note.new
    render :no_learning_languages if @author.learning_languages.none?
  end

  def create
    @note = Note.create(params[:note])
    if @note.save
      flash[:notice] = "Note published!"
      redirect_to note_url(@note)
    else
      flash[:error] = "Note publication failed."
      render :new
    end
  end

  def show
    @note = Note.find(params[:id])
    @self_page = @note.author == current_user
  end

  def index
    @author = User.find(params[:id])
    @notes_by_language = @author.notes_by_language
  end
end
