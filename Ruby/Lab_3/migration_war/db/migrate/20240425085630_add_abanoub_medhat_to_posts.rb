class AddAbanoubMedhatToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :Abanoub_Medhat, :string
  end
end
