class AddAhmedRabieToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ahmed_rabie, :string
  end
end
