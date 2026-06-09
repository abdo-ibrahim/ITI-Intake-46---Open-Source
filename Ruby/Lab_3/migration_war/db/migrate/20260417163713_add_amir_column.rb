class AddAmirColumn < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :amir, :string
  end
end
