class CreateBuddyships < ActiveRecord::Migration
  def change
    create_table :buddyships do |t|
      t.integer :user_id
      t.integer :buddy_id

      # incomplete non-redundant buddy join table solution:
      #
      # t.integer :proposing_buddy_id
      # t.integer :receptive_buddy_id

      t.timestamps
    end
  end
end
