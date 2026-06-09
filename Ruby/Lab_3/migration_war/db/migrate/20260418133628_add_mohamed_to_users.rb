class AddMohamedToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :mohamed, :string
  end
end
