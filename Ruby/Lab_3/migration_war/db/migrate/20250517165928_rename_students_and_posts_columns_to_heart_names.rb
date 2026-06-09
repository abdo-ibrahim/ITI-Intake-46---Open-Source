class RenameStudentsAndPostsColumnsToHeartNames < ActiveRecord::Migration[7.1]
  def up
    if column_exists?(:posts, :Nour) && !column_exists?(:posts, :nouran)
      rename_column :posts, :Nour, :nouran
    else
      puts "Skipping rename from :Nour to :nouran - either source or target column already exists."
    end

    if column_exists?(:posts, :ahmed_khaled) && !column_exists?(:posts, :ahmed)
      rename_column :posts, :ahmed_khaled, :ahmed
    else
      puts "Skipping rename from :ahmed_khaled to :ahmed - either source or target column already exists."
    end

    if column_exists?(:students, :rahma) && !column_exists?(:students, :rahma)
      rename_column :students, :rahma, :rahma
    else
      puts "Skipping rename from :rahma to :rahma - either source or target column already exists."
    end

    if column_exists?(:posts, :fares_edres) && !column_exists?(:posts, :fares)
      rename_column :posts, :fares_edres, :fares
    else
      puts "Skipping rename from :fares_edres to :fares - either source or target column already exists."
    end
  end

  def down
    rename_column :posts, :nouran, :Nour if column_exists?(:posts, :nouran)
    rename_column :posts, :ahmed, :ahmed_khaled if column_exists?(:posts, :ahmed)
    rename_column :students, :rahma, :rahma if column_exists?(:students, :rahma)
    rename_column :posts, :fares, :fares_edres if column_exists?(:posts, :fares)
  end
end
