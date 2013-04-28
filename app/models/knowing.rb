class Knowing < ActiveRecord::Base
  attr_accessible :language_id, :user_id

	belongs_to :user
	belongs_to :language
end
