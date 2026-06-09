class AddMokhtarToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :mokhtar, :string
  end
end