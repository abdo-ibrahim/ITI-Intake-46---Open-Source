class RenameGamgoumToZagazig < ActiveRecord::Migration[7.1]
  def change
    rename_column :users, :Gamgoum, :zagazigBranchEltop
  end
end