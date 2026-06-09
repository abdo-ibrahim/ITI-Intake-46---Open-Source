class RenameIslamToIslamRobaa < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :islam, :islam_robaa
  end
end
