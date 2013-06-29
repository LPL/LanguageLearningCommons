class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :startOffset
      t.integer :endOffset
      t.text :body
      t.string :markType

      t.references :note
      t.references :user

      t.timestamps
    end
  end
end