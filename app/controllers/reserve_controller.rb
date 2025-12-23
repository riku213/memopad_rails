class ReserveController < ApplicationController
  def index
    seats = Seat.order(:row, :position)
    @seats = seats.size.to_s
    seats.each do |s|
      @seats += ",#{s.row},#{s.position},#{s.condition}"
    end
  end
end