class RenameAbdelrahmanMahallawyToAmirMawla1 < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :abdelrahman_mahallawy, :amir_mawla_1
  end
end
