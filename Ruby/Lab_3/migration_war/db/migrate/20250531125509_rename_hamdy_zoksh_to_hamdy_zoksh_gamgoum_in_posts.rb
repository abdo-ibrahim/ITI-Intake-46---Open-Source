class RenameHamdyZokshToHamdyZokshGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Hamdy_Zoksh, :Hamdy_Zoksh_Gamgoum
  end
end
