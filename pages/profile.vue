<template>
  <section>
    <h1>Naoki Otsu</h1>
    <p class="name-kana">おおつ なおき</p>

    <img
      class="avatar"
      src="~/assets/images/profile.png"
      width="140"
      height="140"
      alt="Naoki Otsu"
    />

    <h2>プロフィール</h2>
    <p>
      Front-End Engineer.<br />
      Vue, React, React Native, Firebase, GraqhQL, バスケ,
      映画(インターステラー), @rebuildfmも好き<br />
      Webやアプリを作るのが好きです<br />
      福岡県の糸島に住んでいます
    </p>

    <h2>経歴</h2>
    <p>大学卒業 → SoftBank → TRGP → DeNA → TechJIN → Vega corporation.</p>

    <h2>出身</h2>
    <p>熊本県 南阿蘇</p>

    <h2>プライベートワーク</h2>
    <p>
      <a
        href="https://itunes.apple.com/jp/app/%E5%AE%B6%E8%A8%88%E7%B0%BFtouchlife-%E7%B0%A1%E5%8D%98%E4%BA%BA%E6%B0%97%E3%81%AE%E3%81%8A%E5%B0%8F%E9%81%A3%E3%81%84%E5%B8%B3/id1460375602?mt=8"
        target="_blank"
        >「TouchLife」</a
      >
      ... 家計簿アプリ(ReactNative + Firebase)
    </p>
    <p>
      <a
        href="https://play.google.com/store/apps/details?id=info.naokiotsu&hl=ja"
        target="_blank"
        >「マロンのおうちにかえろう」</a
      >
      ... 横スクロールのアクションゲーム(Unity)
    </p>
    <p>
      <a
        href="https://play.google.com/store/apps/details?id=com.rna1&hl=ja"
        target="_blank"
        >「ボイス」</a
      >
      ... 鳴き声アプリ(ReactNative)
    </p>

    <h2>好きなもの</h2>
    <p>
      ・バスケ(NBA、マイケルジョーダン)<br />
      ・映画 インターステラー、インセプション、ソーシャルネットワーク<br />
      ・ゲーム スマブラ、ウイイレ、荒野行動<br />
      ・Mr.Children<br />
      ・日曜日のサンデーモーニング → ワイドナショーの流れ<br />
      ・カイジ 「柿ピー1日半欠けら」になるシーン<br />
    </p>

    <h2>LT</h2>
    <p>
      <a href="http://www.itstaffing.jp/engineer/entry/20151211_1"
        >【イベントレポート】ページをより楽しく印象的にする「CSSアニメーション」を学ぶスキルアップイベント</a
      >
    </p>

    <h2>SNS</h2>
    <ul>
      <li>
        <a href="https://twitter.com/melo15" target="_blank" rel="noopener">
          <img
            src="~/assets/svg/twitter.svg"
            width="24"
            height="24"
            alt="Naoki Otsu Twitter"
          />
        </a>
        <a href="https://twitter.com/melo15" target="_blank" rel="noopener">
          @melo15
        </a>
      </li>
      <li>
        <a href="https://github.com/NaokiOtsu" target="_blank" rel="noopener">
          <img
            src="~/assets/images/github-black.png"
            width="24"
            height="24"
            alt="Naoki Otsu Github"
          />
        </a>
        <a href="https://github.com/NaokiOtsu" target="_blank" rel="noopener">
          NaokiOtsu
        </a>
      </li>
      <li>
        <a
          href="https://www.instagram.com/n.otsu1029/"
          target="_blank"
          rel="noopener"
        >
          <img
            src="~/assets/svg/instagram.svg"
            width="24"
            height="24"
            alt="Naoki Otsu Github"
          />
        </a>
        <a
          href="https://www.instagram.com/n.otsu1029/"
          target="_blank"
          rel="noopener"
        >
          n.otsu1029
        </a>
      </li>
    </ul>

    <h2>Contact</h2>
    <p>
      n.otsu1029@gmail.com
    </p>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  head() {
    return {
      title: `Profile | Naoki Otsu`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.body
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'og:title',
          content: `Profile | Naoki Otsu`
        },
        {
          name: 'og:description',
          content: this.body
        },
        {
          name: 'og:image',
          content: 'https://naoki-otsu.com/icon.png'
        }
      ]
    }
  }
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables.scss';

section {
  max-width: $width;
  margin: 80px auto;
  font-size: 1.4rem;
}

h1 {
  margin: 0 0 10px;
  font-size: 6rem;
  line-height: 6rem;
}

.name-kana {
  margin: 0 0 50px;
}

h2 {
  margin: 50px 0 10px;
  padding: 0;
  font-size: 2rem;
  line-height: 2rem;
}

p {
  margin: 0;
  padding: 0;
}

ul {
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  a:first-child {
    margin-right: 10px;
  }
}

.avatar {
  border-radius: 50%;
}

// for SP
@media (max-width: $width + (10px * 2)) {
  section {
    margin: 20px auto;
    padding: 0 10px;

    h1 {
      margin: 0 0 0;
      font-size: 2rem;
      line-height: 1.6;
    }

    .name-kana {
      margin: 0 0 20px;
      font-size: 1.2rem;
    }

    .avatar {
      width: 100px;
      height: 100px;
    }

    h2 {
      margin: 30px 0 10px;
      font-size: 1.8rem;
    }

    p {
      font-size: 1.4rem;
      line-height: 1.6;
    }

    ul {
      margin: 0;
      padding: 0;
      font-size: 1.4rem;
    }
  }
}
</style>
