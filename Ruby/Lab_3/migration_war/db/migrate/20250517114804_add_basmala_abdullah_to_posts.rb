class AddBasmalaAbdullahToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :basmala_abdullah, :string
  end
end
