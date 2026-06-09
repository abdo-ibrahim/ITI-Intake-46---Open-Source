class AddAbdoTolbaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :abdo_tolba, :string
  end
end
