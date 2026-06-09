class AddNadaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :nada_emam, :string
  end
end
