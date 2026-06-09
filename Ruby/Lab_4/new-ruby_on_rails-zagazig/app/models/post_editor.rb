class PostEditor < ApplicationRecord
  belongs_to :post
  belongs_to :editor
end