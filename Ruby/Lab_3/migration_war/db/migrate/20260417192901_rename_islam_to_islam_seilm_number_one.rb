class RenameIslamToIslamSeilmNumberOne < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :islam_robaa, :islam_seilm_number_one
  end
end
