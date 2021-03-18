class CreateInformers < ActiveRecord::Migration[6.0]
  def change
    create_table :informers do |t|
      t.string :fname
      t.string :lname
      t.string :position

      t.timestamps
    end
  end
end
