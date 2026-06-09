class RenameYasserToAli < ActiveRecord::Migration[7.1]
  def change
    if column_exists?(:posts, :yasser) && !column_exists?(:posts, :ali)
      rename_column :posts, :yasser, :ali
    end
  end
end