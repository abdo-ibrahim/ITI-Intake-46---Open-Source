class CreatePostEditors < ActiveRecord::Migration[8.1]
  def change
    create_table :post_editors do |t|
      t.references :post, null: false, foreign_key: true
      t.references :editor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
