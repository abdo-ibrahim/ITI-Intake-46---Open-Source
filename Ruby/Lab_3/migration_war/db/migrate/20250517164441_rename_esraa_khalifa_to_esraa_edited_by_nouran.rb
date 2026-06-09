class RenameEsraaKhalifaToEsraaEditedByNouran < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :esraa_khalifa, :esraa_nouran_edited
  end
end
