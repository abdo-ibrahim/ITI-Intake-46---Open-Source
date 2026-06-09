class AddMohamedHanyToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mohamed_hany, :string
  end
end
