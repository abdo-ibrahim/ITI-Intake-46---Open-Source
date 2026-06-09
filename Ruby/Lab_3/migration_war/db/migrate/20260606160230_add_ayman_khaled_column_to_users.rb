class AddAymanKhaledColumnToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :ayman_khaled, :string
  end
end
