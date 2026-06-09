class AddNesmaToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :nesma, :string
  end
end
