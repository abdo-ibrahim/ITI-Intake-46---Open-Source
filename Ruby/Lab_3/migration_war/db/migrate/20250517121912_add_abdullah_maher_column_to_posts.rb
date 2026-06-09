class AddAbdullahMaherColumnToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :abdullah_maher, :string
  end
end
