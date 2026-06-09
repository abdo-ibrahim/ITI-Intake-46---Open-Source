class AddMostafaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mostafa, :string
  end
end
