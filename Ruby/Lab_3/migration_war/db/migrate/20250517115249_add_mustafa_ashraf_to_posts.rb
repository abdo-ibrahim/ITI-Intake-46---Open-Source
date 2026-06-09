class AddMustafaAshrafToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :Mustafa, :string
  end
end
