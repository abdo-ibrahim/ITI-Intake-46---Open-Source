class RenameGamgoummToGamgoummGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Gamgoumm, :Gamgoumm_Gamgoum
  end
end
