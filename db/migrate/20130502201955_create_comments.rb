class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :range
      t.text :body
      t.string :markType

      t.references :note
      t.references :user

      t.timestamps
    end
  end
end