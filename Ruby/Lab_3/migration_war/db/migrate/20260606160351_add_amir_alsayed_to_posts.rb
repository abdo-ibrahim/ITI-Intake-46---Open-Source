class AddAmirAlsayedToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :amir_alsayed, :string
  end
end
