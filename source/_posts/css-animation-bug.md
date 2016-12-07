---
title: CSSアニメーションのスマホ(iOS/Android)で起きる不具合/バグ
date: 2016-12-05 20:42:43
tags: css
---

普段のスマホのコーディングでは、かなり多くのユーザーを抱えたWeb開発に携わらせて頂いていますが、
そうするとCSSアニメーションで「動かない」などの声を頂くことも多くあり、
どんな書き方をすると、どの端末で動かない事があるのか。
またその対応策など、自分の遭遇したもの中心に記載しておこうと思います。  

## transformが含まれた複数プロパティをアニメーションさせた時にAndroid2系で動かない

`「transform + 任意のプロパティ」`をアニメーションさせた時に、  
keyframesの指定が 0% → 100% となっているとAndroid2系で動きません。  
よくある要件としては、`「移動させながらopacityを1にする」「縮小しながらopacityを0にする」`などでしょうか。

**動かない書き方**   

```css
.test {
  -webkit-animation: hoge 2s infinite;
}
@-webkit-keyframes hoge {
  0%   { -webkit-transform: translate(0, 0);     opacity: 0; }
  100% { -webkit-transform: translate(100px, 0); opacity: 1; }
}
```

結論、「100%」→`「99.9%,to」`と書くと動きますので、  
keyframesの指定は`「99.9%,to」`の書き方で統一しておくと良さそうです。  

**動く書き方**

```css
@-webkit-keyframes hoge {
    0%       { -webkit-transform: translate(0, 0);     opacity: 0; }
    99.9%,to { -webkit-transform: translate(100px, 0); opacity: 1; }
}
```

translateだけのアニメーションでは、「100%」にしても不具合は発生しませんでしたので、  
組み合わせてアニメーションした場合に限り発生するようです。  

## animation-fill-modeを指定すると、Android2系で動かない

`animation-fill-mode`は、Android2系がサポートされておらず、  
指定するとアニメーションが動かなくなります。

**動かない書き方**  

```css
.box {
  width: 50px;
  height: 50px;
  background: black;
  -webkit-animation: hoge 1s forwards;
}
@-webkit-keyframes hoge {
  0%       { opacity: 1; }
  99.9%,to { opacity: 0; }
}
```
この場合、`opacity`の初期値を予め設定しておき`forwards`を削除する事でAndroid2系でも動くようになります。  
初め`forwards`をサポートしてないブラウザは、単に無視されるのかなと思いましたが、指定されていただけで動かなくなりましたので、指定は削除する必要がありそうでした。  

**動く書き方**

```css
.box {
  width: 50px;
  height: 50px;
  background: black;
  opacity: 0;
  -webkit-animation: hoge 1s;
}
```

## 擬似要素へのアニメーションがAndroid2,4系で動かない

`:before` や `:after` の擬似要素ですが、PCやiOSは動作確認出来ましたが、Android2,4系でも動かない端末がありました。  
現状、擬似要素へのアニメーションが必要な場合は、`span`タグなどで代替する必要がありそうです。  

## transformの値を省略すると動かない

例えば、「拡大しながら右にアニメーションしたい」という時に、  
下記のように0%時の`translateX()`を省略すると、Chromeなどでも動作確認出来ませんでした。  

**動かない書き方**  

```css
.box {
  width: 50px;
  height: 50px;
  background-color: black;
  -webkit-animation: hoge 1s infinite;
}
@-webkit-keyframes hoge {
  0%       { -webkit-transform: scale(0); }
  99.9%,to { -webkit-transform: scale(1) translateX(100px); }
}
```

0%時のプロパティも省略せずに記述することで回避できます。  

**動く書き方**  

```css
.box {
  width: 50px;
  height: 50px;
  background-color: black;
  -webkit-animation: hoge 1s infinite;
}
@-webkit-keyframes hoge {
  0%       { -webkit-transform: scale(0) translateX(0); }
  99.9%,to { -webkit-transform: scale(1) translateX(100px); }
}
```

## animation-timing-function: steps()はAndroid2系がサポートしていない

コマ送りのスプライト画像を準備して、`animation-timing-functionのsteps()`を使ってコマ送りアニメーションを実装する方法がありますが、Android2系でサポートしていない為、もし実装したい場合はJavaScriptなどを使用する必要がありそうです。  

steps()の実装方法については下記が参考になります。  
[CSSスプライトとstepsを使ってアニメーション画像を作ろう](http://www.webcreatorbox.com/tech/css-sprite-steps/)  

```css
.box {
  width: 50px;
  height: 50px;
  background-image: url(../images/heart.png);
  background-size: 1450px auto;
  -webkit-animation: hoge 1s steps(29) infinite;
}
@-webkit-keyframes hoge {
  0%       { background-position: 0 0; }
  99.9%,to { background-position: -1450px 0; }
}
```

また、`animation-timing-function`の`cubic-bezier()`もAndroid2,4系で対応してない端末があるため(5系から正常に動作。)、スマホ案件では、`ease-in-out`や`linear`などの基本指定に留めておいたほうがよさそうです..。PCでは問題なさそうです。  

## dispalayとopacityをtransitionさせる時の注意点

例えば、最初は`display: none;`な要素を、class付与のタイミングで`display: block;`にすると同時にフェードインさせたい時に、`transition`でアニメーションさせる場合の注意点です。  

下記のように実装すれば問題なさそうに見えますが、一瞬でboxが表示されてしまい意図した動作にならない場合があります。  

**意図しない動作の書き方**

```css
.box {
  width: 50px;
  height: 50px;
  background: black;
  display: none;
  opacity: 0;
  -webkit-transition: opacity 1s;
}

.box.active {
  display: block;
  opacity: 1;
}
```

こちらの対応策はいくつか方法がありそうですが、  
簡単なものだと`animation`の`keyframes`を使用することで回避出来ます。  

**意図した動作の書き方**  

```css
.box {
  width: 50px;
  height: 50px;
  background: black;
  display: none;
}

.box.active {
  display: block;
  opacity: 1;
  -webkit-animation: hoge 1s;
}
@-webkit-keyframes hoge {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
```

## translateとrotateを同時にアニメーションさせる場合は、記述順で動作が異なる

こちら色々な端末で確認できましたが、  
例えば、回転させながら横に動かしたい時に、  
下記のような実装をすると意図した動作となります。  

```css
.box {
  width: 100px;
  height: 100px;
  background-color: black;
  -webkit-animation: hoge 1s infinite;
}
@-webkit-keyframes hoge {
  0%       { -webkit-transform: translateX(0) rotate(0); }
  99.9%,to { -webkit-transform: translateX(100px) rotate(180deg); }
}
```

ただ、下記のように`rotate`プロパティを先に記述してしまうと基準点が変わってしまい、  
意図した動作になりませんでした。

```css
@-webkit-keyframes hoge {
  0%       { -webkit-transform: rotate(0) translateX(0) ; }
  99.9%,to { -webkit-transform: rotate(180deg) translateX(100px); }
}
```

`translate`と`rotate`を組み合わせる場合は、`translate`を先に書くようにしておくと良さそうです。  


## 3d系の指定をすると、Android2系でおかしな挙動となる場合がある

端末のGPUを使用する為に、下記のようなプロパティを指定する事があるのですが  
* transform: translate3d(0,0,0);
* transform: translateZ(0);
* backface-visibility: hidden; 

指定するとAndroid2系でいくつか不具合があがっているようです。
* フォーム関連要素がページ内にあった場合に、タップ位置が変わったりといった挙動がおかしくなる。  
* scale, rotate, skewのtransformプロパティが正常に動作しなくなる。  
* 特定のCSSプロパティの上書きが反映されなくなる (positionなど)

JIRAなどでAndroid2系のみおかしな挙動が起きた場合は、
ページ内の3d系プロパティを疑うのも1つの解決方法となりそうです。  


## 使用できるプロパティ、使用出来ないプロパティを調べてみたところ...

transform系以外のプロパティは、Android2系でも問題なく動作していそうです。  
例: `opacity, background-color, box-shadow`など。  

transform系でAndroid2系も含めて動作確認出来たのは、  
`translateX, translateY, scaleX, scaleY, rotate, skewX, skewY, transform-origin, matrix`などでした。  

Android2系で、動作確認出来なかったプロパティは、  
`translateZ, rotateX, rotateY, perspective`などの3d系プロパティが使えないようです。  

Android2系までサポートしようとすると3D系のアニメーションは厳しい状況です。  

2DのアニメーションであればAndroid2系含めて動作しますので(複雑でたくさん動かしたい場合はパフォーマンス的に厳しそうですが..)、様々な場面で検討していくと良さそうです。


## 不具合への対策まとめ

・`keyframes`は`「100%」→「99.9%, to」`と書く。
・`animation-fill-mode`(bothやforwardsなど)は、Android2系で使えないので注意する。初期値を予め設定しておくと良い。
・`cubic-bezier()`は、Android2系では使えない。
・疑似要素でアニメーションが必要な場合は、`span`タグなどで代替する。
・`keyframes`内の、各％のプロパティは省略せずに記述する。
・`animation-timing-function: steps();`はAndroid2系がサポートしていない
・`dispalay`と`opacity`を併用したアニメーションでは、`keyframes`を使用すると良い。
・`translate`と`rotate`を同時にアニメーションさせる場合は、`translate`を先に記述する。
・3d系のプロパティ(`translate3d, backface-visibility: hidden;`)の指定がある場合は、Android2系で不具合が起きる可能性があることを知っておく。

以上になります。  
間違ってるところなどありましたら、ご連絡頂けると有難いです。  
今後のCSSアニメーション実装の参考にして頂ければと思います。
