class AddMariamBack < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mariam, :string
  end
end
