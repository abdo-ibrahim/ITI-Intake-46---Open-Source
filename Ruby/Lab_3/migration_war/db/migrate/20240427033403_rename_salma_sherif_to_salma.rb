class RenameSalmaSherifToSalma < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :salma_sherif, :salma
  end
end
