class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body

      t.references :note
      t.references :user

      t.timestamps
    end
  end
end