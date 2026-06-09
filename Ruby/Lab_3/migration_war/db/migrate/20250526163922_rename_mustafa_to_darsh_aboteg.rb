class RenameMustafaToDarshAboteg < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :mostafa_hosny, :Darsh_Aboteg
  end
end
