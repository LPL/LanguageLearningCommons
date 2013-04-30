class Note < ActiveRecord::Base
  attr_accessible :author, :author_id, :language, :language_id, :title, :body

  belongs_to :author, :class_name => 'User'
  belongs_to :language
  has_many :revisions

  validates :author, :title, :body, :presence => true
  #validates_uniqueness_of :title, :scope => :author
end
