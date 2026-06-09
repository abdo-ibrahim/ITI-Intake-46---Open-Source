class AddAbdallahAhmedHabsaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :abdallah_ahmed_habsa, :string
  end
end
