class AddMahmoudnabilToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mahmoud, :string
  end
end
