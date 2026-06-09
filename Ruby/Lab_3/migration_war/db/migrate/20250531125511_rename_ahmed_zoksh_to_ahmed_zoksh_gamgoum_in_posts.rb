class RenameAhmedZokshToAhmedZokshGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Ahmed_Zoksh, :Ahmed_Zoksh_Gamgoum
  end
end
