class CreateLearnings < ActiveRecord::Migration
  def change
    create_table :learnings do |t|
			t.references :user, :null => false
			t.references :language, :null => false

      t.timestamps
    end
  end
end
