class AddSalmaSherifToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :salma_sherif, :string
  end
end
