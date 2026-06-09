class AddMahaGalalToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :MahaGalal, :string
  end
end
