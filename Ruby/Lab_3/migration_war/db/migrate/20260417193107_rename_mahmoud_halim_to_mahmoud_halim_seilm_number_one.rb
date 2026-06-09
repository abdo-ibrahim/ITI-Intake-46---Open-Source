class RenameMahmoudHalimToMahmoudHalimSeilmNumberOne < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :mahmoud_halim_robaa, :mahmoud_halim_seilm_number_one
  end
end
