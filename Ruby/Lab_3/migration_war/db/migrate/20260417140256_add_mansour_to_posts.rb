class AddMansourToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :masnour, :string
  end
end
