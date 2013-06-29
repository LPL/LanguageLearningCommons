class Note < ActiveRecord::Base
  attr_accessible :author, :author_id, :language, :language_id, :title, :body

  belongs_to :author, :class_name => 'User'
  belongs_to :language
  has_many :comments
  has_many :revisions

  validates :author, :title, :body, :presence => true
  validates :title, :uniqueness => {:scope => :author_id}
  # cannot .build notes due to preceeding line (author_id will be missing)
end
