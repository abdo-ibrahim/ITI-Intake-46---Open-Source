class AddYoussefMohamedToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :youssefMohamed, :string
  end
end
