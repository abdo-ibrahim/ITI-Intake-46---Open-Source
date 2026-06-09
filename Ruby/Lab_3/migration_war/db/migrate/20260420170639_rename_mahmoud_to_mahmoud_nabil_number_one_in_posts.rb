class RenameMahmoudToMahmoudNabilNumberOneInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :mahmoud, :mahmoud_nabil_number_one
  end
end
