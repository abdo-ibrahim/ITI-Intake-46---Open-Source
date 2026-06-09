class AddMonaEidToPosts < ActiveRecord::Migration[7.1]
    def change
      add_column :posts, :mona_eid, :string
    end
  end
  