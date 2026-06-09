class RenameArwaToArwaSayedIpmagic   < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Arwa, :arwa_ipmagic
  end
end
