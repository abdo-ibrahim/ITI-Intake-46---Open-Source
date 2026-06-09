class AddKhaledToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :khaled, :string
  end
end
