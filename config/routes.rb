TongueTrader::Application.routes.draw do

	root to: 'user#show'
  devise_for :users do
    member do
      resources :notes, :only => [:new, :create, :show, :index]
    end
  end
end
