class ChangeEndTimeToTimeInActiveSprints < ActiveRecord::Migration[7.1]
  def change
    def change
      change_column :active_sprints, :end_time, :time
    end
  end
end
