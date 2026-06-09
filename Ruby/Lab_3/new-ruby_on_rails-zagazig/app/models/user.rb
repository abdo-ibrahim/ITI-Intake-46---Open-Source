class User < ApplicationRecord
  # Validations

  validates :name, :dob, :email, :phone_number, :address, presence: true

  # Email format validation
  validates :email, 
            presence: true, 
            uniqueness: true, 
            format: { 
              with: URI::MailTo::EMAIL_REGEXP, 
              message: "must be a valid email address" 
            }


end
