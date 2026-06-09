class RenameBasmalaAbdullahToBasmalaAbdullahGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :basmala_abdullah, :basmala_abdullah_Gamgoum
  end
end
