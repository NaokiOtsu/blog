---
title: Youtubeの再生リストの動画を一覧表示する - Youtube Data API v3
date: 2016-11-13 21:48:04
tags: youtube
---

自分のプライベートなプロダクトで、
Youtubeの再生リストの動画を一覧表示する機能が入れる必要がありまして、
<a href="https://developers.google.com/youtube/v3/getting-started?hl=ja" target="_blank">Youtube Data API v3 のガイド</a>を見ながらやっていましたが、
スムーズに行かなかったので結論の実装方法をメモしておくことにしました。

<h2><strong>実装方法</strong></h2>

下記の4ステップを踏むと良かったです。

<h3><strong>1. APIキーを取得する</strong></h3>

<a href="https://developers.google.com/youtube/registering_an_application?hl=ja" target="_blank">こちら</a>の手順を踏んで、APIキーを取得します。

<h3><strong>2. 表示したい動画のリクエストURLを<a href="https://developers.google.com/youtube/v3/docs/?hl=ja" target="_blank">リファレンス</a>から調べます</strong></h3>

自分の場合は、再生リストの一覧が欲しかったので、<a href="https://developers.google.com/youtube/v3/docs/playlistItems/list?hl=ja" target="_blank">こちら</a>のリクエストURLが必要でした。

``` php
GET https://www.googleapis.com/youtube/v3/playlistItems
```

GET形式で、このURLにリクエストをすれば良いようです。

<h3><strong>3. 再生リストのIDを調べる</strong></h3>

再生リストを表示したい場合は、再生リストIDというのが必要なようでした。
チャンネルIDとかも必要なのかなと思っていましたが、それは必要なかったです。

再生リストIDは、例えば
<a href="https://www.youtube.com/playlist?list=PLlVlyGVtvuVnAx-u38QOieyVIrMEmzuDx" target="_blank">https://www.youtube.com/playlist?list=PLlVlyGVtvuVnAx-u38QOieyVIrMEmzuDx</a>
の再生リストのIDは、

```
PLlVlyGVtvuVnAx-u38QOieyVIrMEmzuDx
```

のように、URLの最後の部分になるようです。

<h3><strong>4. Ajaxでリクエストを投げてレスポンスを表示する</strong></h3>

Youtube Data API v3のガイドだと、リクエストURLに <code>?part=</code> とかを付けて、受け取ってねとありましたが、
jQueryとかだと、下記のようにリクエストを投げても、無事に欲しいレスポンスが返ってくるので、自分はこっちで実装しました。

``` js
$.ajax({
  type: 'get',
  url: 'https://www.googleapis.com/youtube/v3/playlistItems', // リクエストURL
  dataType: 'json',
  data: {
    part: 'snippet', // partは必須で指定が必要とのこと。レスポンスで返してもらいたいデータをカンマ区切りで指定する。snippetがあればとりあえず動画を再生するレスポンスが受け取れる。
    playlistId: 'PLlVlyGVtvuVnAx-u38QOieyVIrMEmzuDx', // 再生リストID
    maxResults: 20, // デフォルトは5件までしか受け取らないので、取得件数を変更
    key: '{APIキー}'
  }
}).done(function(response) {
  // 成功
}).fail(function() {
  // エラー
});
```

これで入力項目が問題なければ、成功するので、
あとは、返ってきた <code>response</code> から動画を表示させれば良いです。

``` js
response.items.forEach(function(item) {
    var id = item.snippet.resourceId.videoId;
    $('#list').append('&lt;iframe width="560" height="315" src="https://www.youtube.com/embed/'+ id +'" frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;');
});
```