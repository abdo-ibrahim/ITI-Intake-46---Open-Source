class AddOmniaMohamedToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :OmniaMohamed, :string
  end
end
