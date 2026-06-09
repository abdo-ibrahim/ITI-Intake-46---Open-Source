class RenameAbdelrahmanMahallawyToHandsom < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :mahallawyEltop, :abdoIbrahim
  end
end
