class AddAhmedKamalToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ahmed_kamal, :string
  end
end
