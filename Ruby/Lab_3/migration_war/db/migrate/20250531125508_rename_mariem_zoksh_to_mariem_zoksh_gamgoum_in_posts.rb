class RenameMariemZokshToMariemZokshGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Mariem_Zoksh, :Mariem_Zoksh_Gamgoum
  end
end
