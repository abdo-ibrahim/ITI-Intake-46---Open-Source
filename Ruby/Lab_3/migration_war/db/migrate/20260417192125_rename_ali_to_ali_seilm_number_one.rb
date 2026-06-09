class RenameAliToAliSeilmNumberOne < ActiveRecord::Migration[7.1]
  def change
    if column_exists?(:posts, :ali_robaa)
      rename_column :posts, :ali_robaa, :ali_seilm_number_one
    end
  end
end