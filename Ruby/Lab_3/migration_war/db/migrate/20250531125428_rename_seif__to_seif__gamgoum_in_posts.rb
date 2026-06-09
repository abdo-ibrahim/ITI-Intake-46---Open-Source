class RenameSeifToSeifGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :seif_, :seif__Gamgoum
  end
end
