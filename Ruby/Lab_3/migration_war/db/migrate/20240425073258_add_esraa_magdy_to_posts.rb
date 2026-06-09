class AddEsraaMagdyToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :Esraa, :string
  end
end
