class RenameAhmedSayedToAhmedSayedGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :ahmed_sayed, :ahmed_sayed_Gamgoum
  end
end
