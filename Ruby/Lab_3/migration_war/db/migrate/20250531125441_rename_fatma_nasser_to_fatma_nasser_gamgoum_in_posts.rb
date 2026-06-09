class RenameFatmaNasserToFatmaNasserGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :fatma_nasser, :fatma_nasser_Gamgoum
  end
end
