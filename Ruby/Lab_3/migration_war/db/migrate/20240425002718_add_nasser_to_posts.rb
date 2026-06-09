class AddNasserToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :nasser, :string
  end
end
