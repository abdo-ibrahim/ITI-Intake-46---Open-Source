class RenameNouranToNouranGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :nouran, :nouran_Gamgoum
  end
end
