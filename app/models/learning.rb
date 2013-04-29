class Learning < ActiveRecord::Base
  attr_accessible :language_id, :user_id

	belongs_to :user
	belongs_to :language

  validates :user, :language, :presence => true
end
