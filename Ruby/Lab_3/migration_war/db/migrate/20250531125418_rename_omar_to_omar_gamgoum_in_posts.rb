class RenameOmarToOmarGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :omar, :omar_Gamgoum
  end
end
