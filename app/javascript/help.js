import jquery from "jquery"
window.$ = jquery

$(function(){
  // #help_btn がクリックされたら open_popup 関数を実行
  $("#help_btn").click(function(){
    open_popup();
  });
});

function open_popup(){
  var pop_title = "HELP";
  var url = "/help";
  // ウィンドウのサイズや位置を指定
  var location_str = 'height=600,width=800,top=10,left=10';
  
  // 新しいウィンドウを開く
  var help_window = window.open(url, pop_title, location_str);
  
  // 開いたウィンドウにフォーカスを当てる（最前面にする）
  if (help_window) {
    help_window.focus();
  }
  window.onstorage = message_receive;
  
  return false;
}

// メッセージ受信時の処理
function message_receive(event) {
  if (event.key != 'message') return; // 関係ないデータは無視
  if (!event.newValue) return;        // 空データは無視

  var message = JSON.parse(event.newValue);

  if (message.command == 'inquire') {
    window.focus(); // メインウィンドウを前面に

    var inq_number = message.inq_number;

    if (inq_number == 1) {
      // 1番の場合: ページを再読み込み（トップページへ）
      window.location.href = '/';
    } 
    else if (inq_number == 2) {
      // 2番の場合: 画面にメッセージを追加
      $('<div>', {'text': 'New Element from HELP', 'class': 'alert alert-success'}).appendTo("#messages");
    }
  }
}