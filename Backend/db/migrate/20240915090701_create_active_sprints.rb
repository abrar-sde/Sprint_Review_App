class CreateActiveSprints < ActiveRecord::Migration[7.1]
  def change
    create_table :active_sprints do |t|
      t.string :sprint_name
      t.datetime :sprint_date
      t.datetime :end_time

      t.timestamps
    end
  end
end
