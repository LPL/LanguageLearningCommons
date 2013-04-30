class CreateKnowings < ActiveRecord::Migration
  def change
    create_table :knowings do |t|

      t.timestamps
    end
  end
end
