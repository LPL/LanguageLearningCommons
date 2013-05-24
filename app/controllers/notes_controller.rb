class NotesController < ApplicationController
  def new
    @author = current_user
    @author_id = @author.id
    @note = Note.new
    render :no_learning_languages if @author.learning_languages.none?
  end

  def create
    @note = Note.create(params[:note])
    if @note.save
      flash[:notice] = "Note published!"
      redirect_to user_note_url(@note.author_id, @note)
    else
      flash[:error] = "Note publication failed."
      render :new
    end
  end

  def show
    @note = Note.find(params[:id])
    @author = @note.author
    @self_page = @note.author == current_user
  end

  def index
    @author = User.find(params[:user_id])
    @self_page = @author == current_user
    @notes_by_language = @author.notes_by_language
    @suggestion_language = suggestion_language(@author)
  end
end
