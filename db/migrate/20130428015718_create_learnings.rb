class CreateLearnings < ActiveRecord::Migration
  def change
    create_table :learnings do |t|
			t.references :user
			t.references :language

      t.timestamps
    end
  end
end
