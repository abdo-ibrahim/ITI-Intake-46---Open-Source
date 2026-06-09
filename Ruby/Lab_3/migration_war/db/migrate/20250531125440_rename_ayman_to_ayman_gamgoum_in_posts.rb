class RenameAymanToAymanGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Ayman, :Ayman_Gamgoum
  end
end
