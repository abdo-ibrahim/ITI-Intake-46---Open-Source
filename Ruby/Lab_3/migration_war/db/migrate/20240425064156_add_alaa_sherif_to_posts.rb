class AddAlaaSherifToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :alaa_sherif, :string
  end
end
