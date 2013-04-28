TongueTrader::Application.routes.draw do

	root to: 'user#show'
  devise_for :users
end
