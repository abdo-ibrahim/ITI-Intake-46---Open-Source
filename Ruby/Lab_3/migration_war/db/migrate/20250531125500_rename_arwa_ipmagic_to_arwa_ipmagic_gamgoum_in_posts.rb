class RenameArwaIpmagicToArwaIpmagicGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :arwa_ipmagic, :arwa_ipmagic_Gamgoum
  end
end
