---
title: gitでsubmoduleを自分のリポジトリ管理下に置く方法
date: 2016-12-04 09:53:32
tags: git
---

gitで、プロジェクトのリポジトリ内で、別のsubmoduleを`git clone`などして、
更に、そのsubmoduleに変更を加えたりすると下記のような表示となり、
ファイルは変更されているけど、このファイルはsubmoduleで他のリポジトリで管理されているファイルだよ、というようなメッセージが表示される。

``` shell
modified:   something/file (modified content, untracked content)
```

この場合、この変更が特に必要ないものならば、
```
cd something/file
git checkout .
```
で変更をなかった事にすれば元には戻るが、
変更が必要なもので、それを自分のリポジトリ管理下に置き直したい場合は
下記の方法があるようだった。
**※ただ、そのsubmoduleのLicenseには十分気をつけなければいけない。**

```
git rm --cached something
rm -rf something/.git
git add something
```

submoduleをプレーンなファイルにして(.gitを削除して)、`git add`する。

参考: http://stackoverflow.com/questions/4161022/git-how-to-track-untracked-content