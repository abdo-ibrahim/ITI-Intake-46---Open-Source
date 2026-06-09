class AddMohammedIbrahimToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :MohammedIbrahim, :string
  end
end
