class RenameOpensourceAssiut < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :Arwa_Sayed, :Arwa_Zoksh if column_exists?(:posts, :Arwa_Sayed)
    rename_column :posts, :nada_salah, :Nada_Zoksh if column_exists?(:posts, :nada_salah)
    rename_column :posts, :Darsh, :Mostafa_Zoksh if column_exists?(:posts, :Darsh)
    rename_column :posts, :Abdo, :AbdAllah_Zoksh if column_exists?(:posts, :Abdo)
    rename_column :posts, :sub_Leader, :Yasmeen_Zoksh if column_exists?(:posts, :sub_Leader)
    rename_column :posts, :Grace, :Ghada_Zoksh if column_exists?(:posts, :Grace)
    rename_column :posts, :omar_mahmoud, :Omar_Zoksh if column_exists?(:posts, :omar_mahmoud)
  end
end
