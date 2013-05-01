class Buddyship < ActiveRecord::Base
  attr_accessible :user_id, :buddy_id

  belongs_to :user
  belongs_to :buddy, :class_name => :User

  validates :user, :buddy, :presence => true
  validates :buddy_id, :uniqueness => {:scope => :user_id}
end