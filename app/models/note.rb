class Note < ActiveRecord::Base
  attr_accessible :author_id, :title, :body

  belongs_to :author, :class_name => 'User'

  validates :author, :title, :body, :presence => true
end
