class AddGeorgeSadek01ToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :you_will_not_kill_my_allies, :string
  end
end
