class RenameFaresToFaresGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :fares, :fares_Gamgoum
  end
end
