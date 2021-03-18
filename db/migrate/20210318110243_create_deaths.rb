class CreateDeaths < ActiveRecord::Migration[6.0]
  def change
    create_table :deaths do |t|
      t.string :pid13
      t.string :sex
      t.integer :age
      t.date :d_date
      t.string :d_cod
      t.string :cod

      t.timestamps
    end
  end
end
