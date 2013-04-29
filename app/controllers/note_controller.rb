class NoteController < ApplicationController
  def new
    @note = Note.new
  end

  def create
  end

  def show
    @note = Note.find(params[:id])
  end

  def index
  end
end
