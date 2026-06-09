class AddIslamToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :islam, :string
  end
end
