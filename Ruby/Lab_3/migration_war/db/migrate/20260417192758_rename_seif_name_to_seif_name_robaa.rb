class RenameSeifNameToSeifNameRobaa < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :seif_name, :seif_name_robaa
  end
end
