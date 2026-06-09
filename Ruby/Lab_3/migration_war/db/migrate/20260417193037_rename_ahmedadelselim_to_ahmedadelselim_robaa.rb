class RenameAhmedadelselimToAhmedadelselimRobaa < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :ahmedadelselim, :ahmedadelselim_robaa
  end
end
