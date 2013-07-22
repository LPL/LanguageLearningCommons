class CreateMarks < ActiveRecord::Migration
  def change
    create_table :marks do |t|
      t.string :markType, :null => false
      t.integer :startOffset, :null => false
      t.integer :endOffset, :null => false
      t.text :body

      t.references :note, :null => false
      t.references :user, :null => false

      t.timestamps
    end
  end
end

