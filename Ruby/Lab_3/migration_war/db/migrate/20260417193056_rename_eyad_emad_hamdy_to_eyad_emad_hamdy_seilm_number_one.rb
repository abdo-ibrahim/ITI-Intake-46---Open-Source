class RenameEyadEmadHamdyToEyadEmadHamdySeilmNumberOne < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :eyad_emad_hamdy_robaa, :eyad_emad_hamdy_seilm_number_one
  end
end
