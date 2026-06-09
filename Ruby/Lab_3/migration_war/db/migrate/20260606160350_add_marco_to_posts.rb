class AddMarcoToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :marco, :string
  end
end
