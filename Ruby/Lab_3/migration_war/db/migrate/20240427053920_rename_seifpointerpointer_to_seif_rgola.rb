class RenameSeifpointerpointerToSeifRgola < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :seifpointerpointer, :seif_
  end
end
