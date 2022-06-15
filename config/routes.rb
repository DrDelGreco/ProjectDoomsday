Rails.application.routes.draw do
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root to: 'pages#home'
  devise_for :users, controllers: {registrations: 'users/registrations'}
  get 'about', to: 'pages#about'

  resources :contacts, only: :create

  get 'contact-us', to: 'contacts#new', as:'new_contact'
  
end
