class AddAbdallahAdelToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :abdallah_adel, :string
  end
end
