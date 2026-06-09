class RenameKhaledToAmmarInUsers < ActiveRecord::Migration[7.1]
  def change
    rename_column :users, :khaled, :ammar
  end
end
