class AddAlbraaToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :albraa, :string
  end
end
