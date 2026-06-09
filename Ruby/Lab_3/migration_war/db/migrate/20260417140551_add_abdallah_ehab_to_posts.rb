class AddAbdallahEhabToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :abdallah_ehab, :string
  end
end
