Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

    resources :emoji, :faq, :password

    root to: 'emoji#index'

end
