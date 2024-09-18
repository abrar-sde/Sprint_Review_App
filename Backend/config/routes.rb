Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  post '/signup', to: 'auth#signup'
  post '/login', to: 'auth#login'
  get '/dashboard', to: 'dashboard#show'

  resources :sprint_reviews, only: [:index, :create] do
    collection do
      post 'update_or_create'  # This adds the custom POST route
    end
  end


  resource :active_sprint, only: [:show, :create] # Singular resource since there will only be one active sprint at a timer

  # Defines the root path route ("/")
  # root "posts#index"
end
