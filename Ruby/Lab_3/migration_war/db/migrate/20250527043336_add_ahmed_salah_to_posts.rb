class AddAhmedSalahToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :AhmedSalah, :string
  end
end
