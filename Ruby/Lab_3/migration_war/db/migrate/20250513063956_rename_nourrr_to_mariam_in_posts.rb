class RenameNourrrToMariamInPosts < ActiveRecord::Migration[7.1]
  def change
    remove_column :posts, :nourrr, :mariam
  end
end
