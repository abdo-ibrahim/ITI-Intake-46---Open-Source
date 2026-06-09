class RenameMostafaToMostafaGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :mostafa, :mostafa_Gamgoum
  end
end
