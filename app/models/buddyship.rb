class Buddyship < ActiveRecord::Base
  attr_accessible :user_id, :buddy_id

  belongs_to :user
  belongs_to :buddy, :class_name => :User

  validates :user, :buddy, :presence => true
  validates_uniqueness_of :buddy, :scope => :user
end