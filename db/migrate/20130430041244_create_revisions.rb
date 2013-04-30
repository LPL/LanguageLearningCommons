class CreateRevisions < ActiveRecord::Migration
  def change
    create_table :revisions do |t|
      t.refereces :note
      t.references :revisor

      t.timestamps
    end
  end
end
