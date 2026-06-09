class RenameAhmedkamalToGandhi < ActiveRecord::Migration[7.1]
  def change
    if column_exists?(:posts, :ahmed_kamal)
      rename_column :posts, :ahmed_kamal, :gandhi
    end
  end
end
