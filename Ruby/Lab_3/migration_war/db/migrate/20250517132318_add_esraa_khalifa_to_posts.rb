class AddEsraaKhalifaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :esraa_khalifa, :string
  end
end
