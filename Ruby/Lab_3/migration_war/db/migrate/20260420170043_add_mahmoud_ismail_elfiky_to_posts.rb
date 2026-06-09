class AddMahmoudIsmailElfikyToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mahmoud_ismail_elfiky, :string
  end
end
