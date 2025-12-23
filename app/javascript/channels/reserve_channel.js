console.log("reserve_channel.js loaded");
import consumer from "channels/consumer"
const reserveChannel = consumer.subscriptions.create("ReserveChannel", {  
  connected() {
    console.log("ReserveChannel connected")
  },  
  disconnected() {},
  received(data) {    
    console.log("received", data)
    // Called when there's incoming data on the websocket for this channel    
    // convert "1A" to (0, 0) , "3D" --> (2, 3)    
    var row_value = data['row'] - 1;    
    var pos_value = data['position'].charCodeAt(0) - seat_A_code;
    book_seat(row_value, pos_value);  
  },
  reserve_seat: function(row, position) {    
    return this.perform('reserve_seat',        
      {row: row, position: position});  
    }
  });
var cell_offset = 15;
var cell_size = 20;
var cell_padding = 10;

var seat_A_code = 'A'.charCodeAt(0);

var max_row = 15;
var max_position = 4;
var reserved = [];
// Get Canvas coordinate of X
function get_x(row){  
  return cell_offset + row * (cell_size + cell_padding);
}
// Get Canvas coordinate of 
function get_y(position){
  return cell_offset + position * (cell_size + cell_padding);
}
// i.e. Convert (1, 2)  --> Seat "2B"
function get_seat_name(row, position){  
  return [row + 1, String.fromCharCode(seat_A_code + position)];
}
// Change the reserved condition, and redraw the seat
function book_seat(row, position){
  reserved[row][position] = 1;
  var canvas = $("#canvas").get(0);
  var context = canvas.getContext("2d");
  draw_seat(context, row, position);
}
// Draw one seat, not reserved --> lime,  reserved --> red
function draw_seat(context, row, position){
  if (reserved[row][position] == 0)
    context.fillStyle = 'lime';
  else
    context.fillStyle = 'red';
  var xpos = cell_offset + row * (cell_size + cell_padding);
  var ypos = cell_offset + position * (cell_size + 
cell_padding);
  context.fillRect(xpos, ypos, cell_size, cell_size);
}
// Draw All seats
function draw_reserved(context){
  for (var i=0; i<max_row; i++){
    for (var j=0; j<max_position; j++){
      draw_seat(context, i, j);
    }
  }
}

$(function(){ // javascript: window.onload
  var canvas = $("#canvas").get(0);
  if (canvas.getContext){
    var context = canvas.getContext("2d");
    context.lineWidth = 1;
    context.font = 'normal 10pt Arial';
    context.textBaseline = 'top';
    // Get Value from rails --> seaquence of Value
    // i.e. 60(num seats), 1, A, 0(not reserved), 1, B, 1(reserved) ...
    //      ==> Seat 1A -- not reserved,  Seat 1B -- reserved
    var seats = $("#seats").val();
    var seats_data = seats.split(',');
    // Initialize array and draw Row index
    for (var i=0; i<max_row; i++){
      reserved[i] = [];   // 2 dimension
      context.strokeText("" + (i + 1),
              i * (cell_size + cell_padding) + 
cell_offset, 1);
      for (var j=0; j<max_position; j++)        reserved[i][j] = 0;    }
    // Draw position index    
    for (i=0; i<max_position; i++){      
      var seat_name = get_seat_name(0, i);      
      context.strokeText(seat_name[1], 1,              
        i * (cell_size + cell_padding) + cell_offset);    
      }
    i = 0;    var num_seats = seats_data[0];
    // Convert received data into "reserved" array data    
    for (i=1; i<num_seats*3+1; i+=3){      
      var row_value = seats_data[i];      
      var pos_value = seats_data[i + 1].charCodeAt(0) - seat_A_code;  
      console.log(row_value, pos_value)    
      var cond_value = seats_data[i + 2];      
      reserved[row_value - 1][pos_value] = cond_value;    
    }    
    draw_reserved(context);  
  }  
  $("#canvas").click(onClick);
});
function onClick(event){
  // obtain canvas absolute coordinate
  var rect = event.target.getBoundingClientRect();
  // convert into Inside-Canvas coordinate
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  var row = Math.floor((x - cell_offset) / (cell_size + cell_padding));
  var position = Math.floor((y - cell_offset) / (cell_size + cell_padding));
  var xpos = get_x(row);
  var ypos = get_y(position);
  if (x >= xpos && x < xpos + cell_size){
    if (y >= ypos && y < ypos + cell_size){
      // Clicked inside the cell:
      console.log("seat hit", row, position)
      if (reserved[row][position] == 1){
        alert("The seat is already reserved.");
      }
      else{
        var seat_name = get_seat_name(row, position)
        // alert("Reserve " + seat_name[0] + seat_name[1] + "!");
        reserveChannel.reserve_seat(seat_name[0], seat_name[1]);
      }
    }
  }
}
