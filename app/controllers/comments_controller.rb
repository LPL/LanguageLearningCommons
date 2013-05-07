class CommentsController < ApplicationController
  def create
    @comment = Comment.new(params[:comment])
    @comment.note_id = params[:note_id]
    @comment.user_id = current_user.id # ! user_id in params is note_author
    if @comment.save
      render :json => @comment
    else
      render :json => "Note author identity crisis!".to_json
    end
  end
end
