class RenameAllColumnsToAhmedwagih < ActiveRecord::Migration[7.1]
  def change
    # Rename existing columns in posts table
    existing_columns = get_column_names(:posts).reject { |col| ['id', 'created_at', 'updated_at'].include?(col) }
    
    existing_columns.each_with_index do |col, index|
      if index <= 100
        new_column_name = "ahmedwagih#{index}"
        rename_column :posts, col, new_column_name unless col == new_column_name
      end
    end
    
    # Add missing columns up to ahmedwagih100
    current_count = existing_columns.count
    if current_count < 101
      (current_count...101).each do |i|
        column_name = "ahmedwagih#{i}"
        add_column :posts, column_name, :string unless column_exists?(:posts, column_name)
      end
    end
  end
  
  private
  
  def get_column_names(table_name)
    columns(table_name).map(&:name)
  end
  
  def columns(table_name)
    ActiveRecord::Base.connection.columns(table_name)
  end
end
