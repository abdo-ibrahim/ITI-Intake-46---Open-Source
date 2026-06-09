class AddHadeerToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :hadeer, :string
  end
end
