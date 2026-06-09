class RenameAyaColumnInPosts < ActiveRecord::Migration[7.1]
  def change
    if column_exists?(:posts, :reem)
      rename_column :posts, :reem, :great_one
    end
  end
end
