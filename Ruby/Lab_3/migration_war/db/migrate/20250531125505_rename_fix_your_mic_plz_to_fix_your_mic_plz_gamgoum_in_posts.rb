class RenameFixYourMicPlzToFixYourMicPlzGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :fix_your_mic_plz, :fix_your_mic_plz_Gamgoum
  end
end
