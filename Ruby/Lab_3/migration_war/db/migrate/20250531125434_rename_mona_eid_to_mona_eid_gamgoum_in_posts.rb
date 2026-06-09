class RenameMonaEidToMonaEidGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :mona_eid, :mona_eid_Gamgoum
  end
end
