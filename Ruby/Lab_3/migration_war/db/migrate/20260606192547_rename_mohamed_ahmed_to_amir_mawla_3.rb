class RenameMohamedAhmedToAmirMawla3 < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :amir_mawla_1, :amir_mawla_3
  end
end
