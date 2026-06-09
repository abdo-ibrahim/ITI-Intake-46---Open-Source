class AddAkhaledToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ahmed_khaled, :string
  end
end
