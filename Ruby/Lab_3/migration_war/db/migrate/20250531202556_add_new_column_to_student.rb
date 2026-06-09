class AddNewColumnToStudent < ActiveRecord::Migration[7.1]
  def change
    add_column :students, :new_column, :string
  end
end
