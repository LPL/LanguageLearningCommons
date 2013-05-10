class CreateRevisions < ActiveRecord::Migration
  def change
    create_table :revisions do |t|
      t.string :range
      t.text :body
      t.string :markType

      t.references :note
      t.integer :user_id

      t.timestamps
    end
  end
end
