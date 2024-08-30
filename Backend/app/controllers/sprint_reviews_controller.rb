class SprintReviewsController < ApplicationController
  before_action :authorized

  # GET /sprint_reviews
  def index
    sprint_reviews = SprintReview.all.order(created_at: :desc)
    render json: sprint_reviews, status: :ok
  end

  # POST /sprint_reviews
  def create
    sprint_review = SprintReview.new(sprint_review_params)
    if sprint_review.save
      render json: { message: 'Sprint review saved successfully.' }, status: :created
    else
      render json: { errors: sprint_review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sprint_review_params
    params.require(:sprint_review).permit(:sprint_name, :sprint_date, :good_points, :better_points)
  end
end
