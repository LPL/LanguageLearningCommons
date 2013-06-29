class Revision < ActiveRecord::Base
  attr_accessible :note_id, :user_id, :body, :markType, :startOffset, :endOffset

  belongs_to :note
  belongs_to :revisor, :class_name => 'User', :foreign_key => 'user_id'
  has_one :note_author, :through => :note, :source => :author

  validates :note, :revisor, :presence => true
end
