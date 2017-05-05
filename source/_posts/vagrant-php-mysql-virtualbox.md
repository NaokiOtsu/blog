---
title: Vagrantで開発環境構築(PHP+Mysql) &#124; VirtualBox
date: 2016-10-25 21:44:12
tags: vagrant
---

Vagrantで開発環境構築(PHP+Mysql)した時のメモです。

## 参考にした記事
こちらの記事を参考に構築しました。
<a href="http://fnya.cocolog-nifty.com/blog/2015/12/vagrant-centos7.html">http://fnya.cocolog-nifty.com/blog/2015/12/vagrant-centos7.html</a>

シンボリックリンクを貼って、ローカルPCからファイル編集出来るようにするのに、下記を参照しました。
<a href="http://qiita.com/tiwu_official/items/f135e6b6fbbe3ec6aa54#8%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AA%E3%83%83%E3%82%AF%E3%83%AA%E3%83%B3%E3%82%AF%E3%81%AE%E4%BD%9C%E6%88%90">http://qiita.com/tiwu_official/items/f135e6b6fbbe3ec6aa54#8%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AA%E3%83%83%E3%82%AF%E3%83%AA%E3%83%B3%E3%82%AF%E3%81%AE%E4%BD%9C%E6%88%90</a>

ただファイル共有が使えないエラーが出てた。ので下記を参考に解決しました。
<a href="http://stackoverflow.com/questions/22717428/vagrant-error-failed-to-mount-folders-in-linux-guest">http://stackoverflow.com/questions/22717428/vagrant-error-failed-to-mount-folders-in-linux-guest</a>