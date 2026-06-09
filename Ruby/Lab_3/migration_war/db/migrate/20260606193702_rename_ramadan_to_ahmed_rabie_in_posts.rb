class RenameRamadanToAhmedRabieInPosts < ActiveRecord::Migration[7.1]
  def change
    if column_exists?(:posts, :ramadan)
      rename_column :posts, :ramadan, :ramadan_renamed_by_ahmed_rabie
    end
  end
end
