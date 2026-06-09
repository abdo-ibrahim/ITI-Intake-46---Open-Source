class RenameYasserToYasserRobaa < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :yasser, :yasser_rob3a
  end
end