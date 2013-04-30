class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title
      t.text :body

      t.references :language
      t.references :author

      t.timestamps
    end
  end
end
