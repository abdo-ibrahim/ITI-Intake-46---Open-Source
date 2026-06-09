class RevertEditedColumnsInPosts < ActiveRecord::Migration[7.1]
  def change
    edited_columns = ActiveRecord::Base.connection.columns(:posts)
                                      .map(&:name)
                                      .select { |name| name.end_with?('_edited') }

    edited_columns.each do |edited_column|
      original_name = edited_column.gsub(/_edited$/, '')
      rename_column :posts, edited_column.to_sym, original_name.to_sym
    end
  end
end