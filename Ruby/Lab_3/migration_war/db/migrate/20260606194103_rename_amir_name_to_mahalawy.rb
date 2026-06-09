class RenameAmirNameToMahalawy < ActiveRecord::Migration[7.1]
  def change
    rename_column :users, :amir_name, :mahalawy
  end
end