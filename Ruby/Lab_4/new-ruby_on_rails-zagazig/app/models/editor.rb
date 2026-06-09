class Editor < ApplicationRecord
  has_many :post_editors, dependent: :destroy
  has_many :posts, through: :post_editors
end