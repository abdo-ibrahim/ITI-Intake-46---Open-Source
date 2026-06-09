class RenameStevenToStevenGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :steven, :steven_Gamgoum
  end
end
