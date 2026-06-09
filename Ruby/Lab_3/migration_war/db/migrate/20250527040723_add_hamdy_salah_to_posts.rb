class AddHamdySalahToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :hamdysalah, :string
  end
end
