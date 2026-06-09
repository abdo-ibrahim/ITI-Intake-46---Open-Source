class RenameHusseinToHusseinGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :hussein, :hussein_Gamgoum
  end
end
