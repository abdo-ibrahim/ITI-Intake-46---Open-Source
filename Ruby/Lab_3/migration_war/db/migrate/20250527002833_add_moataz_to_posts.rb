class AddMoatazToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :moataz, :string
  end
end
