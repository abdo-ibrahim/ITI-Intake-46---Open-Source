class AddMostafaMohamedToAhmedHamadPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :MostafaMohamed, :string
  end
end
