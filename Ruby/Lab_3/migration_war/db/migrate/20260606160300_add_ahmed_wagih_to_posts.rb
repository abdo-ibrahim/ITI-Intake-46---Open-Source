class AddAhmedWagihToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ahmed_wagih, :string
  end
end
