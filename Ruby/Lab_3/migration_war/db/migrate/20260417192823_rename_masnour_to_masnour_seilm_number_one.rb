class RenameMasnourToMasnourSeilmNumberOne < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :masnour_robaa, :masnour_seilm_number_one
  end
end
