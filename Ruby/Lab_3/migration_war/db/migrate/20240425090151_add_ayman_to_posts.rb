class AddAymanToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :Ayman, :string
  end
end
