class RenameNasserToNasserGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :nasser, :nasser_Gamgoum
  end
end
