class AddAhmedToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ahmed_Ramadan, :string
  end
end
