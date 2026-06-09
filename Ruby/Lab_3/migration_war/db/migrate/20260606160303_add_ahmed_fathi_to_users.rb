class AddAhmedFathiToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :Ahmed_fathi, :string
  end
end
