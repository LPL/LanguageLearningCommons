class CreateMarks < ActiveRecord::Migration
  def change
    create_table :marks do |t|
      t.string :markType
      t.integer :startOffset
      t.integer :endOffset
      t.text :body

      t.references :note
      t.references :user

      t.timestamps
    end
  end
end
