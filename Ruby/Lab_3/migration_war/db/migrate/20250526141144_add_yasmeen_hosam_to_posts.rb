class AddYasmeenHosamToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :yasmeen_hosam, :string
  end
end
