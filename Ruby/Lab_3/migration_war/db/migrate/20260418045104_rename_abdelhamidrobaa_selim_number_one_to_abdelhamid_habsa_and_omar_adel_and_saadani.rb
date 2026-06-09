class RenameAbdelhamidrobaaSelimNumberOneToAbdelhamidHabsaAndOmarAdelAndSaadani < ActiveRecord::Migration[7.1]
  def change
      rename_column :posts, :Abdelhamidrobaa_selim_number_one, :Abdelhamid_habsa_and_omar_adel_and_saadani
  end
end
