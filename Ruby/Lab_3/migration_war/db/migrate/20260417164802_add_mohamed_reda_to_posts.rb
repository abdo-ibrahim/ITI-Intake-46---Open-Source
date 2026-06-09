class AddMohamedRedaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mohamed_reda, :string
  end
end
