class AddHusseinToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :hussein, :string
  end
end
