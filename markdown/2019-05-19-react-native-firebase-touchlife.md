---
title: React Native + FirebaseでiOS & Androidアプリを開発してリリースしました
date: 2019-05-19
image: https://blog.naoki-otsu.com/images/2019-05-19/og.png
---

React Native(Expo) + Firebaseで`「TouchLife」`という家計簿アプリを友人と2人で開発して、iOS & Androidアプリとしてリリースしました。

<div style="display: flex; justify-content: center;  align-items: center; margin-top: 42px;">
  <div>
    <img style="width: 100px; margin: 0; padding: 0; border-radius: 16px; box-shadow: 0 0 3px rgba(0,0,0,0.5)" src="/images/2019-05-19/touchlife.png">
  </div>
  <div style="margin-left: 20px;">
    <div style="margin-top: 4px;">
      <a style="" href="https://itunes.apple.com/app/id1460375602" target="_blank"><img src="/images/2019-05-19/Download_on_the_App_Store_Badge_JP_RGB_blk_100317.svg" style="width: 140px; margin: 0;"></a>
    </div>
    <div style="margin-top: 6px;">
      <a style="" href="https://play.google.com/store/apps/details?id=jp.touchlife" target="_blank"><img src="/images/2019-05-19/google-play-badge.png" style="width: 120px; margin: 0 0 0 10px; transform: scale(1.32)"></a>
    </div>
  </div>
</div>

# TouchLifeとは

<div style="display: flex; overflow-x: scroll; -webkit-overflow-scrolling: touch;">
  <div>
    <img src="/images/2019-05-19/capture3.png" class="touchlife-img">
  </div>
  <div>
    <img src="/images/2019-05-19/capture1.png" class="touchlife-img">
  </div>
  <div>
    <img src="/images/2019-05-19/capture4.png" class="touchlife-img">
  </div>
  <div>
    <img src="/images/2019-05-19/capture5.png" class="touchlife-img">
  </div>
  <div>
    <img src="/images/2019-05-19/capture6.png" class="touchlife-img">
  </div>
</div>

簡単にいうと家計簿アプリです。
`お金をちゃんと把握しようとすると出てくる面倒さを解決`する為に作りました。

通常の家計簿は記録するのがメインになると思いますが、そこから一歩踏み込んで、今月使ったお金が前月と比べてプラスなのかマイナスなのか、食費や交際費など細かい勘定科目で見た時にリアルな数字としてはどうなのか、を計算して分析するという特徴があります。

特に`給料日から今日までに使ったお金が前月のまったく同じ日と比べてどうなのか`を計算する同日対比の機能が一番の特徴です。

これからちゃんとお金を把握していきたいなと思っている方に届けば良いなという思いで、リクルートで働いてる友人と遠隔でやりとりしつつ2人で開発しました。

普段は自分もエンジニアとして会社に所属しているので、その合間で開発を進めていった感じです。友人が企画 + デザイン、自分がエンジニアリングを担当。

以下、技術メインで紹介できればと思います。

# 使った技術

- React Native(Expo)
- Firebase
- React Navigation
- redux + thunk
- Sentry
- Google Analytics

# React Native(Expo)

<img src="/images/2019-05-19/react_native.png" style="width: 288px">
<img src="/images/2019-05-19/expo.png" style="    width: 130px; margin-bottom: 40px; margin-left: 15px;">

メインは[React Native](https://facebook.github.io/react-native/) + [Expo](https://expo.io/)です。
最初はExpoは使わずReact Nativeのみで開発していましたが、React Nativeのバージョンアップや何か特別なことを入れようとするとすぐ赤いエラー画面になってしまい、機能の実装よりそのエラーの解決に労力が割かれてるなぁというのが気になっていました。(アプリ開発経験が豊富じゃないと辛い印象だった。React Native開発の経験値不足もある。)

これはいかんということでExpoで1から作り直したのですが、この開発体感がびっくりするぐらい良かった。
基本Expoのレール上の実装になるので機能はExpoで提供されているものに制限されるデメリットはありますが、その分エラーになる事がほとんどなくなり、結果的にそれまでの2倍ぐらいの開発スピードになったと思います。
今回のアプリの要件がExpoの提供範囲内で十分開発可能だったこともExpo移行の理由でした。

また今回は遠隔でやりとりしながらの開発だったんですが、Expoの場合、Expo ClientのiPhoneアプリを通じて[遠隔地でもビルドなしでiPhoneの実機で確認可能](https://docs.expo.io/versions/latest/workflow/how-expo-works/#serving-an-expo-project-for-local-development)で、これが大変役に立ちました。

# Firebase

<img src="/images/2019-05-19/firebase.png" style="width: 218px">

ユーザー認証やデータベースへの保存の仕組みが必要で、認証の仕組みが予め備わっていてモバイルアプリに特化している[Firebase](https://firebase.google.com/)を使う事にしました。
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
主に利用規約、プライバシーポリシーの静的ページの為に使いました。
ExpoのWebViewを使って、アプリ内から参照するようにしています。
またメール認証した後にアプリに戻すリダイレクトが必要だったため、リダイレクト専用のhtmlファイルも配置しています。

ゆくゆくはランディングページにも利用する事になりそうです。
その際は現行のフロントエンドのベストプラクティスが詰まってる[Nuxt](https://ja.nuxtjs.org/)の[generate](https://ja.nuxtjs.org/api/configuration-generate)で作るのが良いかなと思ってます。(このブログもnuxt generate + markdownです)

# React Navigation
ルーティングとナビゲーションは[React Navigation](https://github.com/react-navigation/react-navigation)で実装しました。
最初は[react-native-router-flux](https://github.com/aksonov/react-native-router-flux)を使っていましたが、このモジュール自体がReact Navigationをベースに作られていてReact Navigationの[ドキュメント](https://reactnavigation.org/docs/en/getting-started.html)がしっかり準備されていたので、途中からReact Navigationに変更しました。
これから始めるならReact Navigationで良い印象です。

# redux + thunk
状態管理は[react-redux](https://github.com/reduxjs/react-redux)
またDBへのアクセス時に非同期通信が必要なので、ミドルウェアは[redux-thunk](https://github.com/reduxjs/redux-thunk)を入れました。
[redux-saga](https://github.com/redux-saga/redux-saga)の選択肢もありましたが、thunkの方がなじみがあったのでこちらにしました。

# Sentry

<img src="/images/2019-05-19/sentry.png" style="width: 228px">

バグ検知はExpoで公式にサポートされている[Sentry](https://sentry.io/welcome/)を導入。
ユーザーの端末でエラーが起きるとGmail, Slackに通知が飛ぶようになっています。
[sentry-expo](https://github.com/expo/sentry-expo)を使っていて、今のところ無料範囲内で利用できています。

# Google Analytics
アプリのインストール数などはApp Store Connectのアナリティクスでも確認できますが、具体的な時間帯や詳しい情報も欲しかったのでGoogle Analyticsを導入しました。
[expo-analytics](https://github.com/ryanvanderpol/expo-analytics)を使っています。
さらに踏み込んだ分析をする場合は、[Amplitude](https://amplitude.com/)などを導入すると良さそうです。

# 使用したライブラリ一覧
以下、TouchLifeで使った主なライブラリ一覧です。

# date-fns

<img src="/images/2019-05-19/date-fns.png" style="width: 100px;">

`5月1日(水)`のような日本語にフォーマットされた日付が必要だったので使いました。

[date-fns](https://github.com/date-fns/date-fns)

# UltraDate.js

<img src="/images/2019-05-19/ultra.png" style="width: 150px;">

`給料日が土日祝の場合はその前の平日を取得する`などが必要で、そちらが取得できるUltraDate.jsを使いました。
ちゃんと実装すると面倒な祝日やうるう年の計算など、Dateオブジェクトを便利に拡張したライブラリです。

[UltraDate.js](https://github.com/hrdaya/UltraDate.js)

# react-native-svg + d3-shape

<img src="/images/2019-05-19/May-11-2019 13-52-45.gif" style="width: 182px;">

円グラフの為に使いました。
最初は[react-native-pie-chart](https://github.com/genexu/react-native-pie-chart)を使っていたのですが、円グラフをアニメーションさせようとするとreact-native-pie-chartだと難しそうでこちらを使いました。(アニメーションしない円グラフだけの表示ならreact-native-pie-chartでも十分だと思います)
`d3-shape`で円のデータを作成、それを`react-native-svg`で描画する流れです。

下記の記事が参考になりました。
[Pie animation in React Native using SVG](https://medium.com/@oriharel/pie-animation-in-react-native-using-svg-55d7d3f90156)

[react-native-svg](https://github.com/react-native-community/react-native-svg)
[d3-shape](https://github.com/d3/d3-shape)

# formik + yup

<img src="/images/2019-05-19/ezgif-4-4cda48b81c3e.gif" style="width: 292px;">

メールアドレスやパスワードなどフォームのバリデーションが扱いやすくなるので使いました。Reactの[公式ドキュメント](https://reactjs.org/docs/forms.html#fully-fledged-solutions)でも紹介されているものです。
別の選択肢だと[redux-form](https://github.com/erikras/redux-form)もあり、こちらはフォームの状態をreduxのstoreに保存するようですが、Reactコミュニティの一般的な見解だとフォームの状態をreduxで管理しない方向のようで、`formik`や[react-final-form](https://github.com/final-form/react-final-form)を使うのが良いとのことでした。

[formik](https://github.com/jaredpalmer/formik)
[yup](https://github.com/jquense/yup)

# native-base

<img src="/images/2019-05-19/ezgif-4-b7a0dbc95f5e.gif" style="width: 294px;">

主にフォームのセレクトボックスで使用。
最初セレクトボックスは、[react-native-picker-select](https://github.com/lawnstarter/react-native-picker-select)を使っていたのですが、Androidで見た時に表示がおかしかったので、安定していたnative-baseに切り替えました。

[native-base](https://nativebase.io/)

# react-native-calendars

<img src="/images/2019-05-19/May-11-2019 17-51-11.gif" style="width: 294px;">

カレンダーの実装に使っています。
`monthFormat={"yyyy年MM月"}`などで日本語のフォーマットでカスタマイズ可能なのも良かったです。

[react-native-calendars](https://github.com/wix/react-native-calendars)

# react-native-easy-toast

<img src="/images/2019-05-19/May-11-2019 17-54-10.gif" style="width: 294px;">

マイページなどユーザー情報を変更した時の、成功、失敗をユーザーに知らせる目的で使いました。
表示する位置や色は自由にカスタマイズ出来ます。

[react-native-easy-toast](https://github.com/crazycodeboy/react-native-easy-toast)

# react-native-keyboard-aware-scroll-view

<img src="/images/2019-05-19/ezgif-4-b16a37b3b4cc.gif" style="width: 294px;">

画面の下の方にInput要素があると、`キーボードが下から出てきた時に入力している部分が隠れてしまい何が入力されているのか分からない問題`があったのですが、その部分が隠れないようにスクロールしてくれるモジュールです。自分で実装するとそれなりに大変そうだったので助かりました。

[react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view)

# react-native-modal

<img src="/images/2019-05-19/ezgif-4-86530604c2b8.gif" style="width: 272px;">

シンプルなモーダルです。
簡単に表示、非表示が出来て、スタイルもカスタマイズ可能です。

[react-native-modal](https://github.com/react-native-community/react-native-modal)

# react-native-scrollable-tab-view-universal

<img src="/images/2019-05-19/ezgif-4-b8cf6619d868.gif" style="width: 294px;">

タブ切り替えが必要な箇所に使いました。
スワイプ操作にも対応しているのでUXも良い印象です。
最初は、[react-native-scrollable-tab-view](https://github.com/ptomasroos/react-native-scrollable-tab-view)を使っていましたが、`ScrollViewの中で使おうとするとAndroidだけ中の要素が表示されない不具合`があり、それが解決されているuniversalを使うことにしました。
universalも`react-native-scrollable-tab-view`をForkしてるものになるので、この不具合が修正が改善されれば、`react-native-scrollable-tab-view`で良いと思います。

[react-native-scrollable-tab-view-universal](https://github.com/turfaa/react-native-scrollable-tab-view-universal)

# react-native-snap-carousel

<img src="/images/2019-05-19/ezgif-4-b97ac0e6144d.gif" style="width: 292px;">

オープニングやグラフのカルーセルに使いました。
`次や前の月のグラフもちょっと見せるUIにしかった`ので、それが可能だったこちらを使いました。

[react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel)

# react-native-walkthrough-tooltip

<img src="/images/2019-05-19/May-11-2019 19-16-31.gif" style="width: 294px;">

ツールチップの表示に使いました。
アプリの使い方を伝える最初のチュートリアルにも使えそうです。
ツールチップが画面外にはみ出ないように、`ライブラリ側で位置を自動計算`してくれて使う側がそこを意識しなくてよいのが良かったです。

[react-native-walkthrough-tooltip](https://github.com/jasongaare/react-native-walkthrough-tooltip)

# npm-run-all
[実践Expo](https://www.amazon.co.jp/dp/B07L5W41H4/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)に書いてあって初めて知ったんですが、これが便利でした。
`yarn add -D npm-run-all`後に、package.jsonの`scripts`を下記のように書いておいて、
```json
"scripts": {
  "build:ios": "npm-run-all -s ios:*",
  "ios:run": "expo build:ios --non-interactive",
  "ios:file": "mkdir -p .build && wget \"$(expo url:ipa)\" -O .build/app.ipa",
},
```
`yarn build:ios`すると、`ios:run`や`ios:file`などの`ios:*`のscriptsが順番に実行される、というものです。
これでipaファイルが`.build/app.ipa`に生成されるので、後はfastlaneを使ってApp Store Connectにデプロイ → 実機確認 → 申請 → 公開 という感じで無事リリース出来ました。

[実践Expo](https://www.amazon.co.jp/dp/B07L5W41H4/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)は開発の途中からKindle版を買ったんですが、特にExpoを使ったリリース方法 + AnalyticsやSentryの設定方法も載っていて、とても為になりました。Expoで開発する場合はオススメの本です。

# まとめ
React Native良いですね。
開発途中でAndroidで実機確認したんですが、最初にAndroidでiPhoneと同じように動作した時は感動しました。

また途中からExpoで作り直したのも良かったなと思っています。
最初はExpoって公式のReact Nativeからちょっと外れたニッチな開発のように感じて、公式から外れるのはどうかな的な感覚があったのですが使ってみると使いやすくて、`必要ならejectしていつでも公式のReact Nativeに戻せる`というのも移行した理由になりました。

`TouchLife`も定期的に更新して、常に改善している事を感じてもらえるアプリにしていきたいと思います。
最後まで読んでいただき、ありがとうございました👍
