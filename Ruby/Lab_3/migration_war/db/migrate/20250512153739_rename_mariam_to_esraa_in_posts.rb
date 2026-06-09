class RenameMariamToEsraaInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :mariam, :esraa
  end
end
