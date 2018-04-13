---
title: vscodevim(vscode + vim)で効率的にコーディング
date: 2018-04-14 00:19:35
tags:
---

VSCodeはIntelliSenseが良かったり、Emmetがデフォルトで付いて来たりと、ずっと重宝しているエディタの一つ。
何より日々エディタ自体が改善されている感じが好きで毎回のアップデートが楽しみだったりする。

そんなVSCodeだけど、業務として1日中コードを書いていると夕方辺りでコードを書くのがだんだん辛くなっていくのが気になっていた。
VSCodeに限らずどのエディタを使ってもその疲れはくるんだけど、要はマウス操作でファイルを選択したりタブを移動したり、Shiftキーを押しながらコードをコピーしてペーストして、といった感じでホームポジションからどうしても離れないといけない瞬間があり、それが溜まりたまって夕方ぐらいに疲れが押し寄せてくる感じ。

どうにかもっと効率的に体力使わずコードを書いていきたい。ホームポジションから離れずとなるとvimとかemacsとかか。
そんな事を思っている時にふとGoogleの凄そうな人のLive CodingをYoutubeで眺めていたら、VSCodeでvimっぽくコーディングしてらっしゃる。
https://www.youtube.com/watch?v=X8EQSy-ajo4&t=1559s

あ、これだ。ということでVSCodeでvimのように操作できるvscodevimのプラグインを入れて試してみた。

結構良い感じ。
基本はvimのコーディングでホームポジションから離れる事が少なくなった。かつ割り当てたキーバインドで全ファイル検索やサイドバーのファイル移動、ターミナル(tmux)を開いてgitやコマンドが叩けたりしてitermを使う事も少なくなった。
そして、必要ならマウス操作もこれまで同様に可能だったりする。

こちらのブログを参考にさせて頂きつつ、自分なりにキーバインドをカスタマイズした。
https://qiita.com/y-mattun/items/45776b7e1942edb2f727

keybindings.jsonは下記の感じ
```
[
    // プロジェクト全体検索の切り替え
    {
        "key": "ctrl+f",
        "command": "workbench.action.findInFiles",
        "when": "!searchInputBoxFocus"
    },
    {
        "key": "ctrl+f",
        "command": "workbench.action.focusFirstEditorGroup",
        "when": "searchInputBoxFocus"
    },

    // サイドバーのカーソル切り替え
    {
        "key": "ctrl+j",
        "command": "workbench.action.focusSideBar",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+j",
        "command": "workbench.action.focusFirstEditorGroup",
        "when": "!editorFocus"
    },

    // 左右にファイルを開いた時の切り替え
    {
        "key": "ctrl+w ctrl+l",
        "command": "workbench.action.focusFirstEditorGroup",
        "when": "!editorFocus"
    },
    {
        "key": "ctrl+w ctrl+h",
        "command": "workbench.action.focusPreviousGroup",
        "when": "editorFocus"
    },

    // タブの切り替え
    {
        "key": "ctrl+h",
        "command": "workbench.action.previousEditor",
        "when": "editorFocus && vim.mode == 'Normal'"
    },
    {
        "key": "ctrl+l",
        "command": "workbench.action.nextEditor",
        "when": "editorFocus && vim.mode == 'Normal'"
    },

    // Insert Modeでのカーソル移動
    {
        "key": "ctrl+l",
        "command": "cursorRight",
        "when": "editorTextFocus && !editorReadOnly && vim.mode != 'Normal'"
    },
    {
        "key": "ctrl+h",
        "command": "cursorLeft",
        "when": "editorTextFocus && !editorReadOnly && vim.mode != 'Normal'"
    },

    // Suggestion時
    {
        "key": "ctrl+k",
        "command": "acceptSelectedSuggestion"
    },
    {
        "key": "ctrl+n",
        "command": "selectNextSuggestion",
        "when": "editorTextFocus && suggestWidgetMultipleSuggestions && suggestWidgetVisible"
    },
    {
        "key": "ctrl+p",
        "command": "selectPrevSuggestion",
        "when": "editorTextFocus && suggestWidgetMultipleSuggestions && suggestWidgetVisible"
    },

    // 検索からファイルに移動する時
    {
        "key": "ctrl+n",
        "command": "search.focus.nextInputBox",
        "when": "inputBoxFocus && searchViewletVisible"
    },

    // 検索窓を閉じる
    {
        "key": "ctrl+[",
        "command": "workbench.action.closeQuickOpen",
        "when": "inQuickOpen"
    },

    // サイドバーでソースツリーを開いている時
    {
        "key": "r",
        "command": "renameFile",
        "when": "explorerViewletVisible && filesExplorerFocus"
    },
    {
        "key": "Enter",
        "command": "list.select",
        "when": "explorerViewletVisible && filesExplorerFocus"
    },

    // どこにフォーカスしていても使いたいコマンド。
    {
        "key": "ctrl+o ctrl+d",
        "command": "workbench.view.debug"
    },
    {
        "key": "ctrl+o d",
        "command": "workbench.view.debug"
    },
    {
        "key": "ctrl+o ctrl+g",
        "command": "workbench.view.scm"
    },
    {
        "key": "ctrl+o g",
        "command": "workbench.view.scm"
    },

    // サイドバーの表示切り替え
    {
        "key": "[IntlYen] v",
        "command": "workbench.view.explorer",
        "when": "!explorerViewletVisible && vim.mode != 'SearchInProgressMode'"
    },
    {
        "key": "[IntlYen] v",
        "command": "workbench.action.toggleSidebarVisibility",
        "when": "explorerViewletVisible && !searchViewletVisible && !inDebugMode && vim.mode != 'SearchInProgressMode'"
    },

    // コマンドパレットオープン
    {
        "key": "ctrl+o ctrl+o",
        "command": "workbench.action.showCommands"
    },
    {
        "key": "ctrl+o o",
        "command": "workbench.action.showCommands"
    },

    // エディター以外のビューから抜けてくるときに
    {
        "key": "ctrl+w",
        "command": "workbench.action.focusActiveEditorGroup"
    },

    // Emmentをtabで展開
    {
        "key": "tab",
        "command": "editor.emmet.action.expandAbbreviation",
        "when": "config.emmet.triggerExpansionOnTab && editorTextFocus && !editorReadonly && !editorTabMovesFocus"
    },

    // ターミナル切り替え
    {
        "key": "ctrl+k",
        "command": "workbench.action.terminal.toggleTerminal",
        "when": "!terminalFocus && vim.mode != 'SearchInProgressMode'"
    },
    {
        "key": "ctrl+k",
        "command": "workbench.action.terminal.toggleTerminal",
        "when": "terminalFocus && vim.mode != 'SearchInProgressMode'"
    },
]
```

今のところこれ以外のキーバインドは自分には必要なさそうだ。
vimに若干慣れてない感があったり、マルチカーソル、Unde/Redoに不具合があったりしそうだけど、
許容範囲なのでこれでやっていこうかな。
