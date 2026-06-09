class RenameRahmaRoroNouranToRahmaRoroNouranGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :rahma_roro_nouran, :rahma_roro_nouran_Gamgoum
  end
end
