class RenameMohamedIsHereAgainToMahalawyInPosts < ActiveRecord::Migration[7.1]
  def change
    if column_exists?(:posts, :mohamed_is_here_again)
      rename_column :posts, :mohamed_is_here_again, :mahalawy
    end
  end
end