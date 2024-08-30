class CreateSprintReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :sprint_reviews do |t|
      t.string :sprint_name
      t.date :sprint_date
      t.text :good_points
      t.text :better_points

      t.timestamps
    end
  end
end
