---
title: border-imageをRetina対応させるときの備忘録
date: 2016-09-18
---

border-imageを使う時は、
<a href="http://border-image.com/">http://border-image.com/</a>
を使ってCSSソースを生成して貼り付ける事が多いのですが、
こちらで生成されるCSSはRetina対応してない素の画像サイズなので、
スマホ制作してる時とかは画像が大きくなってしまいます。

## Retina対応させる方法
Retina対応する場合は、<code>border-image</code>の数値は変えずに、
<code>border-width</code>の値だけ、1/2とかにすると良いので、
例えば、こうなっていたら↓

``` css
border-width: 36px 40px 40px 44px;
```

こうすると良かったです↓

``` css
border-width: 18px 20px 20px 22px;
```