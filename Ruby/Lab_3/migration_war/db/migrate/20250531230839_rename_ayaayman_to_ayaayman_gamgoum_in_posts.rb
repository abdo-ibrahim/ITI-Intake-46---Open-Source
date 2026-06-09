class RenameAyaaymanToAyaaymanGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :ayaayman, :ayaayman_Gamgoum
  end
end
