class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title, :null => false
      t.text :body

      t.references :language, :null => false
      t.references :author, :null => false

      t.timestamps
    end
  end
end
