class RenameYousefGamgoumToYousefGamgoumShadow < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :yousef_Gamgoum, :yousef_Gamgoum_shadow
  end
end
