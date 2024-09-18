class ChangeSprintDateAndEndTimeInActiveSprints < ActiveRecord::Migration[7.1]
  def change
        # Change the type of sprint_date to date and end_time to time
        change_column :active_sprints, :sprint_date, :date
        change_column :active_sprints, :end_time, :time
  end
end
