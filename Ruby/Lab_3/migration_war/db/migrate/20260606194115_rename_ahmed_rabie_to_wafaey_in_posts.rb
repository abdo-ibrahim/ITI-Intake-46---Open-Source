class RenameAhmedRabieToWafaeyInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :ahmed_rabie, :wafaey1
  end
end
