<?php
// htmlに入力されたAPIキー
$key = $_POST['key'];

// cURLでAPIにアクセス
$ch = curl_init('https://api.man10.red/v1/mshop/shop/list');
$ch_options = [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => ['Authorization: Bearer '.$key],
  CURLOPT_FAILONERROR => true,
  CURLOPT_SSL_VERIFYPEER => false
];

curl_setopt_array($ch, $ch_options);
$ch_response = curl_exec($ch);
curl_close($ch);

// 取得したショップ情報をブラウザに返す
header("Content-type: application/json; charset=UTF-8");
echo json_encode(json_decode($ch_response, true)['data']);
?>
