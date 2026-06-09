class AddAliToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ali, :string
  end
end
