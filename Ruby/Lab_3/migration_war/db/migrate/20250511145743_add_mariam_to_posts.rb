class AddMariamToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mariam, :string
  end
end
