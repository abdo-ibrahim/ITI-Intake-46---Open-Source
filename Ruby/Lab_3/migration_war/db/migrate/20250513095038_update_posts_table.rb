class UpdatePostsTable < ActiveRecord::Migration[7.1]
  def change
    remove_column :posts, :esraafoda, :string
    remove_column :posts, :monica, :string
    remove_column :posts, :nourrr, :string
  end
end
