class AddMonicaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :monica, :string
  end
end
