class AddA7medZakiToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :a7med_zaki, :integer
  end
end
