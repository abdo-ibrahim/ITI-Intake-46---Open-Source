class AddShadowGardenToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :shadow_garden, :string
  end
end
