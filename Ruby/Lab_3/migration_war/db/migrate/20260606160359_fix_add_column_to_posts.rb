class FixAddColumnToPosts < ActiveRecord::Migration[7.1]
  def change
    remove_column :students, :hagersaeednofal, :string
    add_column :posts, :hagersaeednofal, :string
  end
end
