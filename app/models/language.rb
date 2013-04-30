class Language < ActiveRecord::Base
  attr_accessible :name

	has_many :knowings
	has_many :learnings

	has_many :knowers, :through => :knowings, :source => :user
	has_many :learners, :through => :learnings, :source => :user

  has_many :notes

  validates :name, :presence => true
end
