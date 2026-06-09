class AddAlaaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :Alaa_Kamal_eldin, :string
  end
end
