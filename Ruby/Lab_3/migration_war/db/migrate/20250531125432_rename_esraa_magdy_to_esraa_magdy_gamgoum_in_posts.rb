class RenameEsraaMagdyToEsraaMagdyGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Esraa_Magdy, :Esraa_Magdy_Gamgoum
  end
end
