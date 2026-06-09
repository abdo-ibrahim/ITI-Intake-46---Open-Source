class AddYousefToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :yousef, :string
  end
end
