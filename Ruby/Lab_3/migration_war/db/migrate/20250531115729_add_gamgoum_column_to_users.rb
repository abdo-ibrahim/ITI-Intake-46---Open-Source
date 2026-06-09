class AddGamgoumColumnToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :Gamgoum, :string
  end
end
