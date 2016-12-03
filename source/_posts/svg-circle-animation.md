---
title: SVGで円をアニメーションさせたい時のMEMO
date: 2016-09-18 21:35:38
tags: svg
---

くるっと回る円のアニメーションを作りたい。

<img src="https://qiita-image-store.s3.amazonaws.com/0/2582/b6d35e8d-0301-57c4-e4c3-2b12ed7fafd9.png" alt="Create_a_New_Pen.png" />

http://codepen.io/melo15/pen/yJmVEJ

## 実装方法
下記のように実装すると良い。

``` html
<svg width="124" height="124">
    <circle cx="62" cy="62" r="60" />
</svg>
```

``` css
svg {
    transform: rotate(-90deg);
}

circle {
    fill: transparent;
    stroke: #4fa8df;
    stroke-width: 4;
    animation: circle 1s infinite;
}

@keyframes circle {
  0% { stroke-dasharray: 0 377; }
  99.9%,to { stroke-dasharray: 377 377; }
}
```

## 対応ブラウザ
インラインSVGなので、モダンブラウザは対応していて、
IE8以下、Android2系以下辺りは使えなさそう。
http://caniuse.com/#feat=svg-html5

## 実装方法
半径60pxの円を作りたいとすると、
<code>&lt;svg&gt;</code>の<code>width</code>と<code>height</code>には、<code>60px x 2 = 120px</code>
これに、のちのち設定する円の外側の線幅(stroke-width)の4pxを足して、124pxを設定する。
<code>&lt;circle&gt;</code>の<code>cx</code>と<code>cy</code>には、124pxの半分の値を設定し、円を<code>&lt;svg&gt;</code>の中央に配置する。
<code>r</code>は円の半径で60pxを設定するが、この値によって後々アニメーションさせる時の値が変わってくる。

### CSSでは
<code>&lt;circle&gt;</code>の<code>fill</code>を<code>transparent</code>にして塗りつぶしなしに設定。
<code>stroke</code>と<code>stroke-width</code>を指定して、円の外側に線を表示する。
これを<code>animation</code>を使って、くるっと回るアニメーションにする。

### アニメーションでは
破線を設定する<code>stroke-dasharray</code>を使う。
<code>stroke-dasharray: 破線の長さ 破線の間隔;</code>
この破線の長さをアニメーションさせる事で、くるっと回るアニメーションとなる。

### 破線の間隔の値
この時、破線の間隔の値は、円周の長さを設定する必要があり、計算によって導く。
円周の長さは<code>直径 x 3.14</code>で計算する。
今回は、<code>120 x 3.14 = 376.8</code>なので、小数点を切り上げて<code>377</code>とした。
あとは、破線の長さを0から377までアニメーションさせると、くるっと1周するアニメーションとなる。

``` css
@-webkit-keyframes circle {
  0% { stroke-dasharray: 0 377; }
  99.9%,to { stroke-dasharray: 377 377; }
}
```

### 1周ではなく半分のところで止めたい場合は
半分のところで止めたい場合は、<code>377 / 2 = 188.5</code>などを設定すると良い。

最後に、そのままだとアニメーションの開始点が90度ずれてしまうので、
<code>&lt;svg&gt;</code>に<code>transform: rotate(-90deg);</code>を設定して、上からくるっと回るアニメーションにする。

同じようなアニメーションのデモも、CodePenにあったのでメモ。

https://codepen.io/kyledws/pen/Gvelt/


