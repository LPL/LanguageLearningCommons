class CreateBuddyships < ActiveRecord::Migration
  def change
    create_table :buddyships do |t|
      t.integer :user_id, :null => false
      t.integer :buddy_id, :null => false

      t.timestamps
    end
  end
end
