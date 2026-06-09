class RenameOmarZokshToOmarZokshGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Omar_Zoksh, :Omar_Zoksh_Gamgoum
  end
end
