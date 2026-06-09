class AddMohamedAhmedToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mahallawyEltop, :string
  end
end
