class AddMostafaHosnyToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mostafa_hosny, :string
  end
end
