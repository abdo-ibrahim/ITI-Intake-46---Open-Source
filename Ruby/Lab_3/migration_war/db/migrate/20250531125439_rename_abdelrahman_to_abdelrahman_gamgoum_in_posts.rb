class RenameAbdelrahmanToAbdelrahmanGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :abdelrahman, :abdelrahman_Gamgoum
  end
end
