class AddMohammedAmrToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mohammed_amr, :string
  end
end
