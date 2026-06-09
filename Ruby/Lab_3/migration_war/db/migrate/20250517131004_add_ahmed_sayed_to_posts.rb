class AddAhmedSayedToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ahmed_sayed, :string
  end
end
