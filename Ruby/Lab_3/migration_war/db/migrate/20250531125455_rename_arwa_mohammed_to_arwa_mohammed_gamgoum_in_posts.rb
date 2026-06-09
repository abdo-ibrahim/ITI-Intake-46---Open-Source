class RenameArwaMohammedToArwaMohammedGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :arwa_mohammed, :arwa_mohammed_Gamgoum
  end
end
