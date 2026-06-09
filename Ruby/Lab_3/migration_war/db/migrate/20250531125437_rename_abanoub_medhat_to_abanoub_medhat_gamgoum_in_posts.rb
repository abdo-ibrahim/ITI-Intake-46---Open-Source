class RenameAbanoubMedhatToAbanoubMedhatGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Abanoub_Medhat, :Abanoub_Medhat_Gamgoum
  end
end
