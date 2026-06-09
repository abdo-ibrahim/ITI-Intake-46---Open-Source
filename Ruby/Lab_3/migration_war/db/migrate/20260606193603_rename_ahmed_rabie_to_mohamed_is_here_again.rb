class RenameAhmedRabieToMohamedIsHereAgain < ActiveRecord::Migration[7.1]
  def change
    if column_exists?(:posts, :ahmed_rabie)
      rename_column :posts, :ahmed_rabie, :mohamed_is_here_again
    end
  end
end