class AddAyaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :aya, :string
  end
end
