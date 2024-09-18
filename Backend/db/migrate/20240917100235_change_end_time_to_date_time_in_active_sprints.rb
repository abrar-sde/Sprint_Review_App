class ChangeEndTimeToDateTimeInActiveSprints < ActiveRecord::Migration[7.1]
  def change
    change_column :active_sprints, :end_time, :datetime
  end
end
