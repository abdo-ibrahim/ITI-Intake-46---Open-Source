class AddGergesYousefToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :gerges_yousef, :string
  end
end
