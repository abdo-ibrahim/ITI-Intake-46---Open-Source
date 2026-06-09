class AddNouranMohamedToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :nouran, :string
  end
end
