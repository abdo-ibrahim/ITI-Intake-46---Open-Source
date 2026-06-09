class AddArwaToPost < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :Arwa, :string
  end
end
