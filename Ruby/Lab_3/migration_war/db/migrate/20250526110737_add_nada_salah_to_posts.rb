class AddNadaSalahToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :nada_salah, :string
  end
end
