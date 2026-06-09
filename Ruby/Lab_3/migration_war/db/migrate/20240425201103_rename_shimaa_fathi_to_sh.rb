class RenameShimaaFathiToSh < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Shimaa_Fathi, :SH
  end
end
