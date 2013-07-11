class Comment < ActiveRecord::Base
  attr_accessible :note_id, :user_id, :body, :markType, :startOffset, :endOffset

  belongs_to :note
  belongs_to :commenter, :class_name => 'User', :foreign_key => 'user_id'
  has_one :note_author, :through => :note, :source => :author

  validates :note, :commenter, :presence => true
end
