class CreateBuddyshipProposals < ActiveRecord::Migration
  def change
    create_table :buddyship_proposals do |t|
      t.integer :proposing_user_id
      t.integer :target_user_id

      t.timestamps
    end
  end
end
