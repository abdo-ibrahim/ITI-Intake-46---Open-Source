class RenameSeifNameToSeifNameSeilmNumberOne < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :seif_name_robaa, :seif_name_seilm_number_one
  end
end
