class CreateRevisions < ActiveRecord::Migration
  def change
    create_table :revisions do |t|
      t.string :selection
      t.text :commentary

      t.references :note
      t.references :revisor

      t.timestamps
    end
  end
end
