class AddFatmaNasserToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :fatma_nasser, :string
  end
end
