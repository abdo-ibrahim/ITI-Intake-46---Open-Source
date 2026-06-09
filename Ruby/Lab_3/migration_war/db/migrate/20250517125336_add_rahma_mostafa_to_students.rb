class AddRahmaMostafaToStudents < ActiveRecord::Migration[7.1]
  def change
    add_column :students, :rahma, :string
  end
end
