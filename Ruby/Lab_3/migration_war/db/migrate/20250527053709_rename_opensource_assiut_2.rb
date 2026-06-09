class RenameOpensourceAssiut2 < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :mariamSameh, :Mariem_Zoksh
    rename_column :posts, :hamdysalah, :Hamdy_Zoksh
    rename_column :posts, :MahaGalal, :Maha_Zoksh
    rename_column :posts, :AhmedSalah, :Ahmed_Zoksh
    rename_column :posts, :safah_al_java, :Moataz_Zoksh
  end
end
