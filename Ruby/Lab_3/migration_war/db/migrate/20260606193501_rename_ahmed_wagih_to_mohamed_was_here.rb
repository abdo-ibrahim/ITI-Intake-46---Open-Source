class RenameAhmedWagihToMohamedWasHere < ActiveRecord::Migration[7.1]
  def change
    if column_exists?(:posts, :ahmed_wagih)
      rename_column :posts, :ahmed_wagih, :mohamed_was_here
    end
  end
end
