class RenameNadaZokshToNadaZokshGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Nada_Zoksh, :Nada_Zoksh_Gamgoum
  end
end
