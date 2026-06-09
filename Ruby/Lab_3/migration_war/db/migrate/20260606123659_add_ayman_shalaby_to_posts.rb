class AddAymanShalabyToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ayman_shalaby, :string
  end
end
