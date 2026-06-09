class AddYoussefToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :youssef_medhat, :string
  end
end
