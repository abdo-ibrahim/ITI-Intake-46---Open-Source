class AddAmrYasserToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :amr, :string
  end
end
