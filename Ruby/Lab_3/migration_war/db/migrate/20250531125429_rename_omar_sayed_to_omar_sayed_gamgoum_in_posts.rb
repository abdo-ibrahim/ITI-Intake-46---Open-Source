class RenameOmarSayedToOmarSayedGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :omar_sayed, :omar_sayed_Gamgoum
  end
end
