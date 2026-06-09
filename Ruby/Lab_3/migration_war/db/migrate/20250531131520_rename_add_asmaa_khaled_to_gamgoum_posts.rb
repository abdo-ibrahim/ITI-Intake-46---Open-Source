class RenameAddAsmaaKhaledToGamgoumPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :asmaa_khaled, :string
  end
end
