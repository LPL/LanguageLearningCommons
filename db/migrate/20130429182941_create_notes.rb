class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title
      t.text :body

      t.references :language
      t.integer :author_id

      t.timestamps
    end
  end
end
