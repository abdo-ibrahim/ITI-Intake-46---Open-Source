class AddSeifNameToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :seif_name, :string
  end
end
