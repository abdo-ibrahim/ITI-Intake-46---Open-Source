class RenameEsraaToEsraaMagdyInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Esraa, :Esraa_Magdy
  end
end
