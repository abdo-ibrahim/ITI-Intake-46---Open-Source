class AddGradeToStudents < ActiveRecord::Migration[7.1]
  def change
    add_column :students, :grade, :string
  end
end
