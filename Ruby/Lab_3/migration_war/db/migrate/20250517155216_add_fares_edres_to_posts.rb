class AddFaresEdresToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :fares_edres, :string 
  end
end
