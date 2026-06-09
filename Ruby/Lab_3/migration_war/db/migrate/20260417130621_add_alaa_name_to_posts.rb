class AddAlaaNameToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :Alaa_anwar, :string
  end
end
