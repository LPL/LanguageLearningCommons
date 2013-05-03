TongueTrader::Application.routes.draw do

  get "users/test" => "users#test"

	root to: 'users#show'

  devise_for :users , :controllers =>
    { :registrations => "registrations"}

  resources :users, :only => [:show] do
    member do
      resources :knowings, :only => [:show]
      resources :learnings, :only => [:show]
      resources :buddyships, :only => [:index]
      resources :notes, :only => [:new, :create, :show, :index] do
        member do
          resources :revisions, :only => [:create]
        end
      end
    end
  end


  resources :languages, :only => [:show, :index]
  resources :buddyships, :only => [:create, :destroy]
  resources :buddyship_proposals, :only => [:create, :destroy]
end
