class AddRamadanToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ramadan, :string
  end
end
