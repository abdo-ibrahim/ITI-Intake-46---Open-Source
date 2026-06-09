class AddMahmoudHalimToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mahmoud_halim, :string
  end
end
