class RenameSalmaToSalmaGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :salma, :salma_Gamgoum
  end
end
