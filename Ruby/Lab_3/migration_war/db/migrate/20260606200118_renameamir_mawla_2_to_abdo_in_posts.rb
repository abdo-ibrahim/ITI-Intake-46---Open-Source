class RenameamirMawla2ToAbdoInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :amir_mawla_2, :abdo5
  end
end
