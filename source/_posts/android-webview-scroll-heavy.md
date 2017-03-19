---
title: AndroidのWebViewでスクロールが重たい問題の改善
date: 2017-03-15 05:06:26
tags:
---

とあるAndroidアプリ案件でWebViewのスクロールが重たい報告があがってきました。  

スクロールしようとしてもAndroidはスムーズにいかず、反応が鈍い感じ..iOSは何も問題なし。

JavaScriptもそれなりに入っているページだったので、  
最初はJavaScriptのリファクタリングを頑張ってましたが、  
頑張ってはみたもののそこまでの改善は見られず..

また大きい画像もあったのでレンダリング処理に時間かかってるのかなという事で、  
最適な画像を準備するようにしても、あまり変わらず..

困り果てて調べていたところ、CSSの可能性が。  

[フロントエンドチューニングの箇条殴り書き ::ハブろぐ](https://havelog.ayumusato.com/develop/performance/e569-frontend_performance_memo.html)  

[[CSS] border-radiusとbox-shadowを組み合わせると、それぞれ単体でのスタイルより５倍重たい！？](http://www.yoheim.net/blog.php?q=20130713)

`border-radius` と `box-shadow` の組み合わせ。  
どうも今回のケースはこれが原因のようでした。  
`box-shadow` を無くしたり、`border-radius`を角丸の画像(懐かしいやり方)に変えたりしたところ、かなり改善されました。  

これらのCSS3系プロパティが重たいというのは聞いてはいたが、ここまでとは。  
特に `border-radius` と `box-shadow` の組み合わせは、よくありそうなケースなので注意が必要ですね。  
大変勉強になりました。  
