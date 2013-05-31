class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :anchorOffset
      t.integer :focusOffset
      t.text :body
      t.string :markType

      t.references :note
      t.references :user

      t.timestamps
    end
  end
end