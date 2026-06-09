class AddGamgoumColumnToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :students, :Gamgoum, :string
  end
end
