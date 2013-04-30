TongueTrader::Application.routes.draw do

	root to: 'users#show'

  devise_for :users
  resources :users do
    member do
      resources :notes, :only => [:new, :create, :show, :index]
      resources :knowings, :only => [:show]
      resources :learnings, :only => [:show]
    end
  end

  resources :languages, :only => [:show, :index]

end
