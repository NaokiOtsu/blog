---
title: git cloneしたsubmoduleを自分のリポジトリで管理する
date: 2016-12-04 09:53:32
tags: git
---

gitで、プロジェクトのリポジトリ内で、別のsubmoduleを`git clone`などして、
更に、そのsubmoduleに変更を加えたりすると下記のような表示となり、
ファイルは変更されているけど、このファイルはsubmoduleで他のリポジトリで管理されているファイルだから`untracked content`だよ、というようなメッセージが表示される。

``` shell
modified:   something/file (modified content, untracked content)
```

この場合、この変更が特に必要ないものならば、
```
$ cd something/file
$ git checkout .
```
で変更をなかった事にすれば元には戻るが、
変更が必要なもので、今後はsubmoduleを自分のリポジトリで管理していきたい場合は
`.git`を削除してsubmoduleから外す事ができる。
**※注意点としては、そのsubmoduleのLicenseには十分気をつけなければいけない事と、そのsubmoduleは元リポジトリの管理から外れるのでpullしてこれない事だろうか。**

```
$ git rm --cached something
$ rm -rf something/.git
$ git add something
```

submoduleをプレーンなファイルにして(.gitを削除して)、`git add`すると良い。

参考: http://stackoverflow.com/questions/4161022/git-how-to-track-untracked-content