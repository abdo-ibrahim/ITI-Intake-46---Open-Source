class RenameOtherColumnsFromPosts < ActiveRecord::Migration[7.1]
  def change
    # Define columns to keep
    keep_columns = %w[id islam omar abdullah_maher created_at updated_at]

    # Get all columns
    all_columns = ActiveRecord::Base.connection.columns(:posts).map(&:name);

    # Get columns to edit
    columns_to_edit = all_columns - keep_columns

    # Edit unwanted columns
    columns_to_edit.each do |column|
      new_name = "#{column}_edited"
      rename_column :posts, column.to_sym, new_name.to_sym
      end
  end
end
