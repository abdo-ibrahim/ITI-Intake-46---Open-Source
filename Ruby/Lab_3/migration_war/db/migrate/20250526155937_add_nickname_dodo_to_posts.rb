class AddNicknameDodoToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :nickname_dodo, :string
  end
end
