class AddIbrahimToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ibrahim, :string
  end
end
