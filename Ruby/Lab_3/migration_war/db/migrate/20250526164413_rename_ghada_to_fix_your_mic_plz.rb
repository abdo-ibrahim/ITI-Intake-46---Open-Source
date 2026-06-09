class RenameGhadaToFixYourMicPlz < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :nickname_dodo, :fix_your_mic_plz
  end
end
