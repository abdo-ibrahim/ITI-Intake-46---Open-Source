class AddYasserToYourModel < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :yasser, :string
  end
end
