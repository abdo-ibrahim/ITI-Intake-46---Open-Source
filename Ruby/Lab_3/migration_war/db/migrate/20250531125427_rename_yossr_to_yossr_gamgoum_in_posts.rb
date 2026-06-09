class RenameYossrToYossrGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :yossr, :yossr_Gamgoum
  end
end
