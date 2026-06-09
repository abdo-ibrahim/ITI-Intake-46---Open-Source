class RenameMostafaSafwatToMostafaSafwatRobaa < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :mostafa_safwat, :mostafa_safwat_robaa
  end
end
