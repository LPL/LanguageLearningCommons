LanguageLearningCommons::Application.routes.draw do

	root to: 'application#welcome'

  devise_for :users , :controllers =>
    { :registrations => "registrations"}

  resources :users, :only => [:show] do
    resources :knowings, :only => [:show]
    resources :learnings, :only => [:show]
    resources :buddyships, :only => [:index]
    resources :notes, :only => [:new, :create, :show, :index] do
      resources :marks, :only => [:create]
    end
  end

  resources :languages, :only => [:show, :index]
  resources :buddyships, :only => [:create, :destroy]
  resources :buddyship_proposals, :only => [:create, :destroy]
  resources :note_demos, :only => [:create]
end
