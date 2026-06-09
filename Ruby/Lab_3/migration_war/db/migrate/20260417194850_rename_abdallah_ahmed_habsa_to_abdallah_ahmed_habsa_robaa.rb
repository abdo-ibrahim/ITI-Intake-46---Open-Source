class RenameAbdallahAhmedHabsaToAbdallahAhmedHabsaRobaa < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :abdallah_ahmed_habsa, :abdallah_ahmed_habsa_robaa
  end
end
