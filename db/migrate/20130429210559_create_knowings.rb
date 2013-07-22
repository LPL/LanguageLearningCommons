class CreateKnowings < ActiveRecord::Migration
  def change
    create_table :knowings do |t|
			t.references :user, :null => false
			t.references :language, :null => false

      t.timestamps
    end
  end
end
