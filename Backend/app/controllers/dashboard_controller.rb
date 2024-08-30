class DashboardController < ApplicationController
  before_action :authorized
  def show
    if current_user.admin?
      render json: { message: 'Welcome Admin', can_create_meeting: true }
    else
      render json: { message: 'Welcome User', can_create_meeting: false }
    end
  end
end
