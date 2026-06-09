class AddNouranToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :Nouran, :string
  end
end
