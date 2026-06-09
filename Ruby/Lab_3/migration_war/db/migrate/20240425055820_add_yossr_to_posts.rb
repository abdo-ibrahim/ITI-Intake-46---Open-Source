class AddYossrToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :yossr, :string
  end
end
