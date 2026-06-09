class RenameWafaey1ToAbdoInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :wafaey1, :abdo
  end
end