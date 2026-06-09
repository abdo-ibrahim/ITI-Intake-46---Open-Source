class RenameKsadounToMohamedHanyWinsInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :ksadoun, :mohamed_hany_wins
  end
end
