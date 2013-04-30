class Note < ActiveRecord::Base
  attr_accessible :author_id, :language_id, :title, :body

  belongs_to :author, :class_name => 'User'
  belongs_to :language

  validates :author, :title, :body, :presence => true
end
