class AddMahmoudRamadanAbbasToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mahmoud_ramadan_abbas, :string
  end
end
