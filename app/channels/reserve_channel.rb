class ReserveChannel < ApplicationCable::Channel
  def subscribed
    stream_from "reserve_channel"
  end

  def reserve_seat(data)
    if Seat.book_seat(data['row'], data['position'])
      ActionCable.server.broadcast(
        "reserve_channel",
        { row: data['row'], position: data['position'] }
      )
    end
  end
end