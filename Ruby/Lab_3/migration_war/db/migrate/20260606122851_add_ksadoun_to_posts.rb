class AddKsadounToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ksadoun, :string
  end
end
