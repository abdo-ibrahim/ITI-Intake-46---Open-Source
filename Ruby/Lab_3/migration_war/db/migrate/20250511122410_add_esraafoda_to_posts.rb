class AddEsraafodaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :esraafoda, :string
  end
end
