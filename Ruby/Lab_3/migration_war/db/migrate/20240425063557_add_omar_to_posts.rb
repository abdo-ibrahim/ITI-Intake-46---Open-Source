class AddOmarToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :omar_sayed, :string
  end
end
