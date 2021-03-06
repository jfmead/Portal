class CreateLectures < ActiveRecord::Migration[5.1]
  def change
    create_table :lectures do |t|
      t.string :title
      t.text :content
      t.belongs_to :group, foreign_key: true

      t.timestamps
    end
  end
end
