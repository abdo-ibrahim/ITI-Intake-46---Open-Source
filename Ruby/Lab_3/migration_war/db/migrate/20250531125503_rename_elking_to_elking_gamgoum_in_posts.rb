class RenameElkingToElkingGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Elking, :Elking_Gamgoum
  end
end
