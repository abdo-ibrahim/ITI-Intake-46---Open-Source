class AddMariamSamehToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :mariamSameh, :string
  end
end
