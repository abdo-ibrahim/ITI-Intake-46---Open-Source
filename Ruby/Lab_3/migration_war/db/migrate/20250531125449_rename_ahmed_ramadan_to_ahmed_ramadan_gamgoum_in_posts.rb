class RenameAhmedRamadanToAhmedRamadanGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :ahmed_Ramadan, :ahmed_Ramadan_Gamgoum
  end
end
