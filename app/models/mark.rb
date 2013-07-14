class Mark < ActiveRecord::Base
  attr_accessible :note_id, :user_id, :body, :markType, :startOffset, :endOffset

  belongs_to :note
  belongs_to :marker, :class_name => 'User', :foreign_key => 'user_id'
  has_one :note_author, :through => :note, :source => :author

  validates :note, :marker, :presence => true
end
