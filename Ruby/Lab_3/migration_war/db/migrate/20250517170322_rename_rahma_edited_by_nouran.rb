class RenameRahmaEditedByNouran < ActiveRecord::Migration[7.1]
  def change
    if column_exists?(:posts, :nouran_mohamed)
      rename_column :posts, :nouran_mohamed, :rahma_roro_nouran 
    else
      puts "Skipping rename from :nouran_mohamed to :rahma_roro_nouran - source column does not exist."
    end
  end
end
