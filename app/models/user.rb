class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  belongs_to :plan

  attr_accessor :stripe_card_token
  #If pro user passes validations then call Stripe and have it set up a subscription after charging customers card
  #stripe responds back wit customer data, and we save customer.id as the customer token
  def save_with_subscription
    if valid?
      #  Here is the original line, After days of fighting it, I can make things work by taking out the plan: plan_id
      #  customer = Stripe::Customer.create(description: email, plan: plan_id, card: stripe_card_token)
      # I think this 2016 version of Stripes acceptable parameters is too different from today's
      # See documentation, now Stripe has products, prices, and plans, but also the id system seems to be gone now 
      
      customer = Stripe::Customer.create(description: email, card: stripe_card_token)
      self.stripe_customer_token = customer.id
      save!
    end
  end
end
