class AddAddressToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :address, :string, null: false, default: ""
  end
end
