class AddMahallawy1ToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :abdelrahman_mahallawy, :string
  end
end
