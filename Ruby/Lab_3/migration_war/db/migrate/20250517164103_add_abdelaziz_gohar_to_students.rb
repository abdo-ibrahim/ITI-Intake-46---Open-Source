class AddAbdelazizGoharToStudents < ActiveRecord::Migration[7.1]
  def change
    add_column :students, :zezo, :string
  end
end
