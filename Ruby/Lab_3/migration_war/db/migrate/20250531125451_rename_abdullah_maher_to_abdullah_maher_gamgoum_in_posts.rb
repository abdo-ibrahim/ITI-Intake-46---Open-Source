class RenameAbdullahMaherToAbdullahMaherGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :abdullah_maher, :abdullah_maher_Gamgoum
  end
end
