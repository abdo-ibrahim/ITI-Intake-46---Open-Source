class RenameYasmeenToWilidiah < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :yasmeen_hosam, :Wilidiah
  end
end
