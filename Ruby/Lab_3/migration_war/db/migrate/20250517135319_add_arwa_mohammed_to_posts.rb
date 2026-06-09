class AddArwaMohammedToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :arwa_mohammed, :string
  end
end
