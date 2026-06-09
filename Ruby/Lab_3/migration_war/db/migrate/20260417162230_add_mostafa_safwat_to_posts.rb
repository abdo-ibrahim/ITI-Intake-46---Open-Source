class AddMostafaSafwatToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mostafa_safwat, :string
  end
end
