class CreateSeats < ActiveRecord::Migration[8.0]
  def change
    create_table :seats do |t|
      t.integer :row
      t.string :position
      t.integer :condition

      t.timestamps
    end
  end
end
