class AddOmarMahmoudToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :omar_mahmoud, :string
  end
end
