class RenameEsraaNouranEditedToEsraaNouranEditedGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :esraa_nouran_edited, :esraa_nouran_edited_Gamgoum
  end
end
