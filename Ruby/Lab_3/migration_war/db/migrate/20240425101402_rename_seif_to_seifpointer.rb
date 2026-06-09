class RenameSeifToSeifpointer < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :seif, :seifpointer
  end
end
