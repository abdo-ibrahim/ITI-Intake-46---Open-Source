class RenameEscapedColumnsFromStudents < ActiveRecord::Migration[7.1]
  def change
    rename_column :students, :rahma, :rahma_edited
  end
end
