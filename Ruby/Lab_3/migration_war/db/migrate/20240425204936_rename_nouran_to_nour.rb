class RenameNouranToNour < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Nouran, :Nour

  end
end
