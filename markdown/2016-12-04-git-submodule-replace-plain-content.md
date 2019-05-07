---
title: git cloneしたsubmoduleを自分のリポジトリで管理する
date: 2016-12-04
---

gitで、プロジェクトのリポジトリ内で、別のsubmoduleを`git clone`などして、
更に、そのsubmoduleに変更を加えたりすると下記のような表示となり、
ファイルは変更されているけど、このファイルはsubmoduleで他のリポジトリで管理されているファイルだから`untracked content`だよ、というようなメッセージが表示される事があります。

``` shell
modified:   something/file (modified content, untracked content)
```

この場合、この変更が特に必要ないものならば、
```
$ cd something/file
$ git checkout .
```
で変更をなかった事にすれば元には戻るのですが、
変更が必要なもので、今後はsubmoduleを自分のリポジトリで管理していきたい場合は
`.git`を削除する事で、submoduleから外す事ができます。
**※注意点としては、そのsubmoduleのLicenseには十分気をつけなければいけない事と、そのsubmoduleは元リポジトリの管理から外れるので、以降はpullしてこれない等があります。**

```
$ git rm --cached something
$ rm -rf something/.git
```

これで、submoduleをプレーンなファイルにして(.gitを削除して)、自分のリポジトリ配下のファイルとなります。

参考: http://stackoverflow.com/questions/4161022/git-how-to-track-untracked-content