class RenameMoatazZokshToMoatazZokshGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Moataz_Zoksh, :Moataz_Zoksh_Gamgoum
  end
end
