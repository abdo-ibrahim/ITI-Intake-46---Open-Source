class AddMahmoudIsmailToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mahmoud_ismail, :string
  end
end
