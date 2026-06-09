class AddAmirMawlaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :top_eltop, :string
  end
end
