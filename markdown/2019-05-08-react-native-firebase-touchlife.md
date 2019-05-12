---
title: ReactNative + FirebaseでiOS/Androidアプリを開発してリリースしました
date: 2019-05-08
---

ReactNative(Expo) + Firebaseで`TouchLife`というiOS/Androidアプリを開発してリリースしました。

<div style="display: flex; align-items: center; margin-top: 24px;">
  <div style="">
    <img style="width: 100px; margin: 0; padding: 0; border-radius: 16px; box-shadow: 0 0 3px rgba(0,0,0,0.5)" src="/images/2019-05-08/touchlife.png">
  </div>
  <div style="margin-left: 16px; padding-top: 8px;">
    <div style="width: 140px;">
      <a href="https://itunes.apple.com/us/app/%E5%AE%B6%E8%A8%88%E7%B0%BFtouchlife-%E7%B0%A1%E5%8D%98%E4%BA%BA%E6%B0%97%E3%81%AE%E3%81%8A%E5%B0%8F%E9%81%A3%E3%81%84%E5%B8%B3/id1460375602?mt=8" target="_blank"><img src="/images/2019-05-08/Download_on_the_App_Store_Badge_JP_RGB_blk_100317.svg" style="width: 100%; margin: 0;"></a>
    </div>
    <div style="width: 140px; margin-top: 2px;">
      <a href="" target="_blank"><img src="/images/2019-05-08/google-play-badge.png" style="width: 100%; margin: 0; transform: scale(1.13)"></a>
    </div>
  </div>
</div>

# TouchLifeとは

<div style="display: flex; overflow-x: scroll;">
  <div>
    <img src="/images/2019-05-08/capture3.png" style="width: 340px;">
  </div>
  <div>
    <img src="/images/2019-05-08/capture1.png" style="width: 340px;">
  </div>
  <div>
    <img src="/images/2019-05-08/capture4.png" style="width: 340px;">
  </div>
  <div>
    <img src="/images/2019-05-08/capture5.png" style="width: 340px;">
  </div>
  <div>
    <img src="/images/2019-05-08/capture6.png" style="width: 340px;">
  </div>
</div>

`お金をきちんと把握しようとすると必ず出てくる面倒さを解決`する為に作った家計簿アプリです。

通常の家計簿は記録するのがメインになると思いますが、
そこから一歩踏み込んで、今月使ったお金が前月と比べてプラスなのかマイナスなのか、食費や交際費など細かい勘定科目で見た時にリアルな数字としてはどうなのか、を計算して分析するという特徴があります。

特に`給料日から今日までに使ったお金が前月のまったく同じ日と比べてどうなのか` を計算する同日対比の機能が一番の特徴です。

きちんとお金を把握していきたいなと思っている方に届けば良いなという思いで、友人と2人で開発しました。
友人が企画 + デザイン、自分がエンジニアリングを担当。

今回は技術メインでアウトプットしたいと思います。

# 使った技術

- ReactNative(Expo)
- Firebase
- React Navigation
- redux + thunk
- Sentry
- Google Analytics

# ReactNative(Expo)

<img src="/images/2019-05-08/react_native.png" style="width: 338px">
<img src="/images/2019-05-08/expo.png" style="width: 150px; margin-bottom: 44px; margin-left: 15px;">

メインはReactNative + Expoです。
最初はExpoを使わずReactNativeのみで開発していたのですが、ReactNativeのバージョンアップや何か特別な事をやろうとするとすぐ赤いエラー画面になってしまい、機能の実装よりそのエラーの解決に労力が割かれている事に気づきました。(アプリ開発経験が豊富じゃないと辛い印象だった)

これはいかんということでExpoで1から作り直したのですが、この開発体感がびっくりするぐらい良かった。
基本Expoのレール上の実装になるので機能はExpoで提供されているものに制限されるデメリットはありますが、その分エラーになる事がほとんどなくなり、結果的にそれまでの2倍ぐらいの開発スピードになったと思います。
今回のアプリの要件がExpoの提供範囲内で十分開発可能だったこともExpo移行の理由でした。

また今回は広島に住んでる友人と遠隔でやりとりしながらの開発だったんですが、Expoの場合、Expo ClientのiPhoneアプリを通じて[遠隔地でもビルドなしでiPhoneの実機で確認可能](https://docs.expo.io/versions/latest/workflow/how-expo-works/#serving-an-expo-project-for-local-development)で、これが大変役に立ちました。

# Firebase

<img src="/images/2019-05-08/firebase.png" style="width: 218px">

ユーザー認証やデータベースへの保存の仕組みが必要で、認証の仕組みが予め備わっていてモバイルアプリに特化しているFirebaseを選定しました。
主に使った機能は、`Authentication、Firestore、Functions, Hosting`の4つです。

# Authentication
- メールアドレス/パスワード認証
- Facebook/Google認証

の2つを実装しました。
特にユーザーの入力したパスワードは`Firebase側のみで管理されて自前で管理しなくてよくなる`(開発者も知る事ができない)ので、よりセキュア + DBにencryptして保存のような実装もいらなくなるので、その分メインの開発に時間を割く事が出来ました。

# Firestore

ユーザー情報とそれに紐づく支出、収入のデータのDB保存が必要だったので、Firestoreを使いました。
`usersコレクションにユーザーごとのデータ、その中に支出、収入のサブコレクションを持つ構成`にしました。
リリースしたばかりなので無料の範囲内で利用できています。

# Functions
お問い合わせすると、その内容をGmailに送信する必要があったのでFunctionsを使って実装しました。
内部で[Nodemailer](https://www.nodemailer.com/)を使っています。下記の記事が非常に参考になりました。
[Vue.js + Firebase functionsでお問い合わせフォームを作成する](https://qiita.com/ryo2132/items/7cdd6c86dd418095f74a)

# Hosting
主に利用規約、プライバシーポリシーページの為に使いました。
ExpoのWebViewを使って、アプリ内から参照するようにしています。
またメール認証した後にアプリに戻すリダイレクトが必要だったため、リダイレクト専用のhtmlファイルも配置しています。

ゆくゆくはランディングページにも利用する事になりそうです。
その際はフロントエンドのベストプラクティスが詰まっている
[Nuxt](https://ja.nuxtjs.org/)の[generate](https://ja.nuxtjs.org/api/configuration-generate)で作るのが良いのかなと思っています。
このブログも`nuxt generate + markdown`で作りました。

# React Navigation
ルーティングとナビゲーションは[React Navigation](https://github.com/react-navigation/react-navigation)で実装しました。
最初は[react-native-router-flux](https://github.com/aksonov/react-native-router-flux)を使っていましたが、このモジュール自体がReact Navigationをベースに作られていてReact Navigationの[ドキュメント](https://reactnavigation.org/docs/en/getting-started.html)がしっかり準備されていたので、途中からReact Navigationに変更しました。
これから始めるならReact Navigationで良い印象です。

# redux + thunk
状態管理は[react-redux](https://github.com/reduxjs/react-redux)
またDBへのアクセス時に非同期通信が必要なので、ミドルウェアは[redux-thunk](https://github.com/reduxjs/redux-thunk)を入れました。
[redux-saga](https://github.com/redux-saga/redux-saga)の選択肢もありましたが、thunkの方がなじみがあったのでこちらにしました。

# Sentry

<img src="/images/2019-05-08/sentry.png" style="width: 228px">

バグ検知はExpoで公式にサポートされている[Sentry](https://sentry.io/welcome/)を導入。
ユーザーの端末でエラーが起きるとGmail, Slackに通知が飛ぶようになっています。
[sentry-expo](https://github.com/expo/sentry-expo)を使っています。今のところ無料範囲内で利用できています。

# Google Analytics
アプリのインストール数などはApp Store Connectのアナリティクスでも確認できますが、具体的な時間帯や詳しい情報も欲しかったのでGoogle Analyticsを導入しました。
[expo-analytics](https://github.com/ryanvanderpol/expo-analytics)を使っています。
さらに踏み込んだ分析をする場合は、[Amplitude](https://amplitude.com/)などを導入すると良さそうです。

# 使用したライブラリ一覧
以下、TouchLifeで使った主なライブラリ一覧です。

# date-fns

<img src="/images/2019-05-08/date-fns.png">

`5月1日(水)`のような日本語にフォーマットされた日付が必要だったので使いました。

[date-fns](https://github.com/date-fns/date-fns)

# UltraDate.js

<img src="/images/2019-05-08/ultra.png">

`給料日が土日祝の場合はその前の平日を取得する`などが必要で、そちらが取得できるUltraDate.jsを使いました。
ちゃんと実装すると面倒な祝日やうるう年の計算など、Dateオブジェクトを便利に拡張したライブラリです。

[UltraDate.js](https://github.com/hrdaya/UltraDate.js)

# react-native-svg + d3-shape

<img src="/images/2019-05-08/May-11-2019 13-52-45.gif">

円グラフの為に使いました。
最初は[react-native-pie-chart](https://github.com/genexu/react-native-pie-chart)を使っていたのですが、円グラフをアニメーションさせようとしたところreact-native-pie-chartだと難しそうだったので、こちらを使いました。(アニメーションしない円グラフだけの表示ならreact-native-pie-chartでも十分だと思います)
`d3-shape`で円のデータを作り、それを`react-native-svg`で描画するような流れです。

下記の記事が参考になりました。
[Pie animation in React Native using SVG](https://medium.com/@oriharel/pie-animation-in-react-native-using-svg-55d7d3f90156)

[react-native-svg](https://github.com/react-native-community/react-native-svg)
[d3-shape](https://github.com/d3/d3-shape)

# formik + yup

<img src="/images/2019-05-08/May-11-2019 17-46-59.gif">

メールアドレスやパスワードなどフォームのバリデーションが扱いやすくなるので使いました。Reactの[公式ドキュメント](https://reactjs.org/docs/forms.html#fully-fledged-solutions)でも紹介されているものです。
別の選択肢だと[redux-form](https://github.com/erikras/redux-form)もあり、こちらはフォームの状態をreduxのstoreに保存するようですが、Reactコミュニティの一般的な見解だとフォームの状態をreduxに入れない方向のようで、`formik`や[react-final-form](https://github.com/final-form/react-final-form)を使うのが良いとのことでした。

[formik](https://github.com/jaredpalmer/formik)
[yup](https://github.com/jquense/yup)

# native-base

<img src="/images/2019-05-08/May-11-2019 17-44-42.gif">

主にフォームのセレクトボックスで使用。
最初セレクトボックスは、[react-native-picker-select](https://github.com/lawnstarter/react-native-picker-select)を使っていたのですが、Androidで見た時に表示がおかしかったので、安定していたnative-baseに切り替えました。

[native-base](https://nativebase.io/)

# react-native-calendars

<img src="/images/2019-05-08/May-11-2019 17-51-11.gif">

カレンダーの実装に使っています。
`monthFormat={"yyyy年MM月"}`などで日本語のフォーマットでカスタマイズ可能なのも良かったです。

[react-native-calendars](https://github.com/wix/react-native-calendars)

# react-native-easy-toast

<img src="/images/2019-05-08/May-11-2019 17-54-10.gif">

マイページなどユーザー情報を変更した時の、成功、失敗をユーザーに知らせる目的で使いました。
表示する位置や色は自由にカスタマイズ出来ます。

[react-native-easy-toast](https://github.com/crazycodeboy/react-native-easy-toast)

# react-native-keyboard-aware-scroll-view

<img src="/images/2019-05-08/May-11-2019 19-24-02.gif">

画面の下の方にInput要素があると、`キーボードが下から出てきた時に入力している部分が隠れてしまい何が入力されているのか分からない問題`があったのですが、その部分が隠れないようにスクロールしてくれるモジュールです。自分で実装するとそれなりに大変そうだったので助かりました。

[react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view)

# react-native-modal

<img src="/images/2019-05-08/May-11-2019 18-07-58.gif">

シンプルなモーダルです。
簡単に表示、非表示が出来て、スタイルもカスタマイズ可能です。

[react-native-modal](https://github.com/react-native-community/react-native-modal)

# react-native-scrollable-tab-view-universal

<img src="/images/2019-05-08/May-11-2019 18-11-07.gif">

タブ切り替えが必要な箇所に使いました。
スワイプ操作にも対応しているのでUXも良い印象です。
最初は、[react-native-scrollable-tab-view](https://github.com/ptomasroos/react-native-scrollable-tab-view)を使っていましたが、`ScrollViewの中で使おうとするとAndroidだけ中の要素が表示されない不具合`があり、それが解決されているuniversalを使うことにしました。
universalも`react-native-scrollable-tab-view`をForkしてるものになるので、この不具合が修正が改善されれば、`react-native-scrollable-tab-view`で良いと思います。

[react-native-scrollable-tab-view-universal](https://github.com/turfaa/react-native-scrollable-tab-view-universal)

# react-native-snap-carousel

<img src="/images/2019-05-08/May-11-2019 18-13-09.gif">

オープニングやグラフのカルーセルに使いました。
`次や前の月のグラフもちょっと見せるUIにしかった`ので、それが可能だったこちらを使いました。

[react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel)

# react-native-walkthrough-tooltip

<img src="/images/2019-05-08/May-11-2019 19-16-31.gif">

ツールチップの表示に使いました。
アプリの使い方を伝える最初のチュートリアルにも使えそうです。
ツールチップが画面外にはみ出ないように、`ライブラリ側で位置を自動計算`してくれて使う側がそこを意識しなくてよいのが良かったです。

[react-native-walkthrough-tooltip](https://github.com/jasongaare/react-native-walkthrough-tooltip)

# npm-run-all
`実践Expo`の本に書いてあって初めて知ったんですが、これが便利でした。
`yarn add -D npm-run-all`後に、package.jsonの`scripts`を下記のように書いておいて、
```json
"scripts": {
  "build:ios": "npm-run-all -s ios:*",
  "ios:run": "expo build:ios --non-interactive",
  "ios:file": "mkdir -p .build && wget \"$(expo url:ipa)\" -O .build/app.ipa",
},
```
`yarn build:ios`すると、`ios:run`や`ios:file`などの`ios:*`のscriptsが順番に実行される、というものです。
これでipaファイルが`.build/app.ipa`に生成されるので、後はfastlaneを使ってApp Store Connectにデプロイ → 実機確認 → 申請 → 配信 という感じで無事リリース出来ました。

`実践Expo`は開発の途中からKindle版を買ったんですが、特にExpoを使ったリリース方法 + AnalyticsやSentryの設定方法も載っていて、とても為になりました。Expoで開発する場合はオススメの本です。
<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=qf_sp_asin_til&t=otsu05d-22&m=amazon&o=9&p=8&l=as1&IS1=1&detail=1&asins=484439875X&linkId=a98f6286de56a7ffec2630da51b8e6d1&bc1=000000&lt1=_blank&fc1=333333&lc1=0066c0&bg1=ffffff&f=ifr">
    </iframe>

# まとめ
ReactNative良いですね。
開発途中でAndroidで実機確認したんですが、最初にAndroidでiPhoneと同じように動作した時は感動しました。

また途中からExpoで作り直したのも良かったなと思っています。
最初はExpoって公式のReactNativeからちょっと外れたニッチな開発のように感じて、公式から外れるのはどうかな的な感覚があったのですが、使ってみると使いやすくて、`必要ならejectしていつでも公式のReactNativeに戻せる`というのも移行した理由になりました。

またこうしてアプリをリリースまで持っていけたのも、所属している会社の影響が大きいです。先月も月の残業時間が0で、プライベートでまとまった時間を取る事ができました。
会社の中にはRubyコミッター、3DCGモデラー、SRE、ng-fukuoka organizer、アセンブリ言語にすごく詳しい方、積極的にOSS活動してる方...などなど、ここシリコンバレーだっけ？という感じで刺激を受けています。福岡、東京で興味のある方は会社を覗いて頂ければと思います。一緒に良いプロダクトを作っていきましょう。
[VEGA corporation](https://www.vega-c.com/)

`TouchLife`も定期的に更新して、常に改善している事を感じてもらえるアプリにしていきたいと思います。
最後まで読んでいただき、ありがとうございました。
