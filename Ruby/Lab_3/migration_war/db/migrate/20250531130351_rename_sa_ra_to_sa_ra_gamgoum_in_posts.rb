class RenameSaRaToSaRaGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :SaRa, :SaRa_Gamgoum
    rename_column :posts, :SH, :SH_Gamgoum
    rename_column :posts, :yousef, :yousef_Gamgoum
  end
end
