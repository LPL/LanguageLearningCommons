class CreateKnowings < ActiveRecord::Migration
  def change
    create_table :knowings do |t|
			t.references :user
			t.references :language

      t.timestamps
    end
  end
end
