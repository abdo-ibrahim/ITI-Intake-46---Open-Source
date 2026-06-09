class RenameJanaHazemToJanaHazemGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :jana_hazem, :jana_hazem_Gamgoum
  end
end
