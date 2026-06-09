class RenameAbdallahToElking < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Abdallah_Sayed, :Elking
  end
end
