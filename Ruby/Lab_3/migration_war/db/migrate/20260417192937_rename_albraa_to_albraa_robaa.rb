class RenameAlbraaToAlbraaRobaa < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :albraa, :albraa_robaa
  end
end
