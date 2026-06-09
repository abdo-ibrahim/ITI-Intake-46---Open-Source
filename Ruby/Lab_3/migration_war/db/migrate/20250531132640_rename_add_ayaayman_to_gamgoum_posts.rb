class RenameAddAyaaymanToGamgoumPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ayaayman, :string
  end
end
