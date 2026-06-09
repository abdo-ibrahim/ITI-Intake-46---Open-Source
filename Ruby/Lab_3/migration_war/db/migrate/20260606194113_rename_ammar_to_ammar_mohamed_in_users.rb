class RenameAmmarToAmmarMohamedInUsers < ActiveRecord::Migration[7.1]
  def change
    rename_column :users, :ammar, :khaldoun
  end
end