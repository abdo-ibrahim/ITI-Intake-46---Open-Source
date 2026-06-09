class AddAbdallaSayedToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :Abdallah_Sayed, :string
  end
end
