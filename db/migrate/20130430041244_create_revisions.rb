class CreateRevisions < ActiveRecord::Migration
  def change
    create_table :revisions do |t|
      t.integer :startOffset
      t.integer :endOffset
      t.text :body
      t.string :markType

      t.references :note
      t.integer :user_id

      t.timestamps
    end
  end
end
