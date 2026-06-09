class AddSwalmiToPost < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :swalmi, :string
  end
end
