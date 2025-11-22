import jquery from "jquery"
window.$ = jquery

$(function(){
  // INQUIREボタンが押されたら
  $("#inquire_btn").click(function(){
    inquire();
  });
});

function inquire() {
  // 選択されている番号を取得 (1: HOME, 2: ADD ELEMENT)
  var inq_number = $("[name=inq_number]").val();

  // メッセージを送信（ローカルストレージに書き込む）
  message_broadcast({'command': 'inquire', 'inq_number': inq_number});

  // ウィンドウを閉じる
  window.close();
  return false;
}

function message_broadcast(message) {
  // ローカルストレージ 'message' にJSONデータを書き込む
  localStorage.setItem('message', JSON.stringify(message));

  // 書き込んだ直後に消す（イベントだけ発生させるため）
  localStorage.removeItem('message');
}