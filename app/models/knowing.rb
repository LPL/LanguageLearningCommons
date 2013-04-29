class Knowing < ActiveRecord::Base
  attr_accessible :language_id, :user_id

	belongs_to :user
	belongs_to :language

  validates :user, :language, :presence => true

  validates user_language_uniqueness

  def user_language_uniqueness
    (Knowing.find_by_user_id_and_language_id(user_id, language_id) == nil) &&
    (Learning.find_by_user_id_and_language_id(user_id, language_id) == nil)
  end
end
