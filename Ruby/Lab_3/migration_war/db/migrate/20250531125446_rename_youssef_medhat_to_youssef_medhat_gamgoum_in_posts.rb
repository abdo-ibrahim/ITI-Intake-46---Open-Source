class RenameYoussefMedhatToYoussefMedhatGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :youssef_medhat, :youssef_medhat_Gamgoum
  end
end
