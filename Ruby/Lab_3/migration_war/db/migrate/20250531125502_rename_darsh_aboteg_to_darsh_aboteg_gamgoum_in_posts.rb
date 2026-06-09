class RenameDarshAbotegToDarshAbotegGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Darsh_Aboteg, :Darsh_Aboteg_Gamgoum
  end
end
