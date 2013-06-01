class Comment < ActiveRecord::Base
  attr_accessible :user_id, :note_id, :body, :markType, :anchorOffset, :focusOffset

  belongs_to :commenter, :class_name => 'User', :foreign_key => 'user_id'
  belongs_to :note
  has_one :note_author, :through => :note, :source => :author

  validates :note, :commenter, :presence => true
end
