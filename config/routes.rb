TongueTrader::Application.routes.draw do

	root to: 'users#show'

  devise_for :users
  resources :users do
    member do
      resources :knowings, :only => [:show]
      resources :learnings, :only => [:show]
      resources :notes, :only => [:new, :create, :show, :index] do
        member do
          resources :revisions, :only => [:new, :create, :show]
        end
      end
    end
  end

  resources :languages, :only => [:show, :index]
  resources :buddyships, :only => [:create, :destroy]
end
