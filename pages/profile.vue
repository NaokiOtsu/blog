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
      Webやアプリを作るのが大好きです<br />
      Vue, React, React Native, Firebase, GraqhQL, バスケ,
      映画(インターステラー), @rebuildfmも好き<br />
    </p>

    <h2>経歴</h2>
    <p>SoftBank → TRGP → DeNA → TechJIN → Vega.<br /></p>

    <h2>好きなもの</h2>
    <p>
      ・マイケルジョーダン<br />
      ・映画 インターステラー、インセプション、ソーシャルネットワーク<br />
      ・ゲーム スマブラ、ウイイレ<br />
      ・Perfumeの「<a
        href="https://youtu.be/CYL3DnyA4e0"
        target="_blank"
        rel="noopener"
        >Sweet Refrain</a
      >」 ... テンポ良くて作業用BGMとしてもGood!<br />
      ・日曜日のサンデーモーニングからワイドナショーの流れ<br />
      ・カイジ 「<a
        href="https://youtu.be/B28ufV4ojkQ"
        target="_blank"
        rel="noopener"
        >柿ピー1日半欠けら</a
      >」になるシーン<br />
      <br />
      空き時間があれば朝から晩までWeb、アプリ開発に没頭してます。<br />
      「ヒットするプロダクトを作る」いつもこの事ばかり考えてます。
      <br />
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
