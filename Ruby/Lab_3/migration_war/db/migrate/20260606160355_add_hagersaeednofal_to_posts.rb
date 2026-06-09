class AddHagersaeednofalToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :students, :hagersaeednofal, :string
  end
end
