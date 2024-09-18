class ActiveSprintsController < ApplicationController
  # before_action :authorized, only: [:create]

  # GET /active_sprint
  # Returns the current active sprint if it exists
  def show
    active_sprint = ActiveSprint.current_active
    if active_sprint
      render json: active_sprint, status: :ok
    else
      render json: { message: 'No active sprint at the moment.' }, status: :ok
    end
  end

  # POST /active_sprint
  # Admins can create an active sprint
  def create

    # unless current_user.admin # Assuming `admin?` is a method to check if the user is an admin
    #   return render json: { message: 'Unauthorized' }, status: :unauthorized
    # end
    
    # Define the sprint end time based on duration (e.g., 30 minutes)
    sprint_duration = Time.now + 2.minutes
    active_sprint = ActiveSprint.new(active_sprint_params.merge(end_time: sprint_duration))

    if active_sprint.save
      render json: { message: 'Active sprint created successfully.', sprint: active_sprint }, status: :created
    else
      render json: { errors: active_sprint.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def active_sprint_params
    params.require(:active_sprint).permit(:sprint_name, :sprint_date)
  end
end
