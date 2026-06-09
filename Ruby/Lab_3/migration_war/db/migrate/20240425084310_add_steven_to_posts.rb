class AddStevenToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :steven, :string
  end
end
