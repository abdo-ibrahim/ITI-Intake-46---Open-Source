class AddAmmarKhaledToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ammar_khaled, :string
  end
end
