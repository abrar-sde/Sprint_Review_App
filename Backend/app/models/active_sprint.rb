class ActiveSprint < ApplicationRecord
  validates :sprint_name, presence: true
  validates :sprint_date, presence: true
  validates :end_time, presence: true

  # Check if there's any active sprint ongoing
  def self.current_active
    where('end_time > ?', Time.now).first
  end
end
