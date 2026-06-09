class RenameAliToAliRobaa < ActiveRecord::Migration[7.0]
  def change
    rename_column :posts, :ali, :ali_robaa
  end
end