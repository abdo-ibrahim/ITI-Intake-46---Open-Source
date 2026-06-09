class AddAbdelrahmanToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :abdelrahman, :string
  end
end
