class AddJanaHazemToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :jana_hazem, :string
  end
end
