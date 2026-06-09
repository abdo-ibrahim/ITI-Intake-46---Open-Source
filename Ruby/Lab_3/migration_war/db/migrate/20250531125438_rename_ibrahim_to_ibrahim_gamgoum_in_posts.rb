class RenameIbrahimToIbrahimGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :ibrahim, :ibrahim_Gamgoum
  end
end
