# app/models/seat.rb
class Seat < ApplicationRecord

  # 座席予約（成功:true / 失敗:false）
  def self.book_seat(row, position)
    seat = Seat.find_by(row: row, position: position)
    return false if seat.nil?

    seat.with_lock do
      return false if seat.condition == 1
      seat.update!(condition: 1)
    end

    true
  end

def self.unbook_seat(row, position)
    seat = Seat.find_by(row: row, position: position)
    return false if seat.nil?

    seat.with_lock do
      return false if seat.condition == 0
      seat.update!(condition: 0)
    end

    true
  end

  # 初期座席生成
  def self.seat_init
    (1..15).each do |row|
      %w[A B C D].each do |pos|
        Seat.find_or_create_by(row: row, position: pos)
      end
    end
  end
end
