class AddSayedToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :sayed, :string
  end
end
