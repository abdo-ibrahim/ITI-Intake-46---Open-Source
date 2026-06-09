class AddMohamedHamdyToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :mohamed_hamdy, :string
  end
end
