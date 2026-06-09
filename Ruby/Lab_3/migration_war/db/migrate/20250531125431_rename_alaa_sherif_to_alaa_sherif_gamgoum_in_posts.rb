class RenameAlaaSherifToAlaaSherifGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :alaa_sherif, :alaa_sherif_Gamgoum
  end
end
