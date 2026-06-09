class AddEyadEmadToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :eyad_emad_hamdy, :string
  end
end
