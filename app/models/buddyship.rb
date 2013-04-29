class Buddyship < ActiveRecord::Base
  attr_accessible :user_id, :buddy_id

  belongs_to :user
  belongs_to :buddy, :class_name => :User

  # incomplete non-redundant buddy join table solution:
  #
  # attr_accessible :proposing_buddy_id, :receptive_buddy_id
  # belongs_to :proposing_buddy, :class_name => :user
  # belongs_to :receptive_buddy, :class_name => :user
end