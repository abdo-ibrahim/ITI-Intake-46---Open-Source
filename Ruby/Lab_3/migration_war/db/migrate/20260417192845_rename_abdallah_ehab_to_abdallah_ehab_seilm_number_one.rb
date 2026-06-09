class RenameAbdallahEhabToAbdallahEhabSeilmNumberOne < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :abdallah_ehab_robaa, :abdallah_ehab_seilm_number_one
  end
end
