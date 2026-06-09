class RenameAddYasminzinToGamgoumPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :yasminzin, :string
  end
end
