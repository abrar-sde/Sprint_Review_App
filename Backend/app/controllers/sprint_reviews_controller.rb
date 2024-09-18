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

    # POST /sprint_reviews/update_or_create
    def update_or_create
      # Find the existing sprint review by sprint_name
      sprint_review = SprintReview.find_by(sprint_name: params[:sprint_review][:sprint_name])
    
      if sprint_review
        # Append the new good points with a newline if present
        if params[:sprint_review][:good_points].present?
          sprint_review.good_points = [sprint_review.good_points, params[:sprint_review][:good_points]].reject(&:blank?).join("\n")
        end
    
        # Append the new better points with a newline if present
        if params[:sprint_review][:better_points].present?
          sprint_review.better_points = [sprint_review.better_points, params[:sprint_review][:better_points]].reject(&:blank?).join("\n")
        end
    
        if sprint_review.save
          render json: { message: 'Sprint review updated successfully.', sprint_review: sprint_review }, status: :ok
        else
          render json: { errors: sprint_review.errors.full_messages }, status: :unprocessable_entity
        end
      else
        # If the sprint review doesn't exist, create a new one
        sprint_review = SprintReview.new(sprint_review_params)
    
        if sprint_review.save
          render json: { message: 'Sprint review created successfully.', sprint_review: sprint_review }, status: :created
        else
          render json: { errors: sprint_review.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end
    

  private

  def sprint_review_params
    params.require(:sprint_review).permit(:sprint_name, :sprint_date, :good_points, :better_points)
  end
end


