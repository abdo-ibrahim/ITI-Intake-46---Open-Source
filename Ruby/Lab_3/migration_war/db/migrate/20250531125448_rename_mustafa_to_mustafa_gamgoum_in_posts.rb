class RenameMustafaToMustafaGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Mustafa, :Mustafa_Gamgoum
  end
end
