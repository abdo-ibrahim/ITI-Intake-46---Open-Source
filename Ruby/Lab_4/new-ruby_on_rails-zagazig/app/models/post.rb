class Post < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: 'user_id'
  
  has_many :post_editors, dependent: :destroy
  has_many :editors, through: :post_editors
end
