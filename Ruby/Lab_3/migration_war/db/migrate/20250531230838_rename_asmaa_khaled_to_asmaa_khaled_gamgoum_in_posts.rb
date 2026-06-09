class RenameAsmaaKhaledToAsmaaKhaledGamgoumInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :asmaa_khaled, :asmaa_khaled_Gamgoum
  end
end
