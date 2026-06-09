class AddShimaaFathiToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :Shimaa_Fathi, :string
  end
end
