class AddYoussefSalahToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :youssef_salah_Gamgoum, :string
  end
end
