class AddYourNameToModel < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ahmedadelselim, :string
  end
end
