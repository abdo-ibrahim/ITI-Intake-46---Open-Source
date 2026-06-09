class AddYasserToPosts < ActiveRecord::Migration[7.0]
  def change
    unless column_exists?(:posts, :yasser)
      add_column :posts, :yasser, :string
    end
  end
end