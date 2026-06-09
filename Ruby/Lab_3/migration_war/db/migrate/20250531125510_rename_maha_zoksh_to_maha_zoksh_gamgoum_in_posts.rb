class RenameMahaZokshToMahaZokshGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Maha_Zoksh, :Maha_Zoksh_Gamgoum
  end
end
