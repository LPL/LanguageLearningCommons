class BuddyshipProposal < ActiveRecord::Base
  attr_accessible :proposing_user, :proposing_user_id,
                  :target_user, :target_user_id

  belongs_to :proposing_user, :class_name => 'User'
  belongs_to :target_user, :class_name => 'User'

  validates :target_user_id, :uniqueness => { :scope => :proposing_user_id }
end
