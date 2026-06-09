class AddMennaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :menna, :string
  end
end
