class AddSaRaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :SaRa, :string
  end
end
