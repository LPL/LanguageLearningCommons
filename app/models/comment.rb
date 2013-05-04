class Comment < ActiveRecord::Base
  attr_accessible :user_id, :note_id

  belongs_to :note
  belongs_to :commenter, :class_name => 'User'
end
