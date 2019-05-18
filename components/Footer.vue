<template>
  <footer>
    <section class="container">
      <h2 v-if="showProfile">Author</h2>

      <div v-if="showProfile" class="box">
        <img
          class="profile"
          width="120"
          height="120"
          src="~/assets/images/profile.png"
          alt="Naoki Otsu"
        />

        <div class="info">
          <h3>Naoki Otsu</h3>
          <p>
            Front-End Engineer.<br />
            Vue, React, React Native, Firebase, GraqhQL, etc..<br />
            フロントエンドを中心に発信しています。<br />
            お気軽にフォローくださいませ。
            <span
              style="position: relative; top: 4px; margin-left: 4px; margin-bottom: 10px"
              ><a
                href="https://twitter.com/melo15?ref_src=twsrc%5Etfw"
                class="twitter-follow-button"
                data-show-screen-name="false"
                data-lang="ja"
                data-show-count="false"
                >Follow @melo15</a
              ><script
                async
                src="https://platform.twitter.com/widgets.js"
                charset="utf-8"
              ></script
            ></span>
            <br />

            <nuxt-link to="/profile/" class="more">...more</nuxt-link>
          </p>
          <ul>
            <li>
              <a
                href="https://twitter.com/melo15"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="~/assets/svg/twitter.svg"
                  width="24"
                  height="24"
                  alt="Naoki Otsu Twitter"
                />
              </a>
              <a
                href="https://twitter.com/melo15"
                target="_blank"
                rel="noopener"
                >@melo15</a
              >
            </li>
            <li>
              <a
                href="https://github.com/NaokiOtsu"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="~/assets/images/github.png"
                  width="24"
                  height="24"
                  alt="Naoki Otsu Github"
                />
              </a>
              <a
                href="https://github.com/NaokiOtsu"
                target="_blank"
                rel="noopener"
                >NaokiOtsu</a
              >
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
                  alt="Naoki Otsu Instagram"
                />
              </a>
              <a
                href="https://www.instagram.com/n.otsu1029/"
                target="_blank"
                rel="noopener"
                >n.otsu1029</a
              >
            </li>
          </ul>
        </div>
      </div>

      <address>
        <small>Naoki Otsu © {{ new Date().getFullYear() }}</small>
      </address>
    </section>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  props: {
    showProfile: {
      type: Boolean,
      default: true
    }
  }
})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables.scss';

footer {
  padding: 10px 0;
  color: white;
  font-size: 14px;
  background: #333;

  .container {
    max-width: $width;
    margin: 0 auto;
  }

  h2 {
    margin: 0 0 20px 0;
    padding-top: 20px;
    font-size: 2.4rem;
  }

  .md-large {
    width: 160px;
    height: 160px;
    border-radius: 160px;
  }

  .box {
    display: flex;
    margin-bottom: 20px;
  }

  .profile {
    margin-top: 5px;
    border-radius: 50%;
  }

  .info {
    flex: 1;
    margin-left: 26px;

    h3 {
      margin-top: 0;
      margin-bottom: 0;
    }

    p {
      margin-top: 4px;
    }

    ul {
      margin: 20px 0 0;
      padding: 0;
      list-style-type: none;
    }

    li {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      a {
        margin-right: 10px;
        color: white;
      }
    }

    .more {
      margin-left: 4px;
      color: white;
      text-decoration: underline;
      line-height: 2;
    }
  }

  address {
    margin: 0;
    text-align: center;
    font-style: normal;
  }
}

// for SP
@media (max-width: $width + (10px * 2)) {
  footer {
    padding: 10px;

    h2 {
      margin: 10px 0 10px;
      padding: 0;
      font-size: 1.8rem;
      line-height: 1.4;
    }

    .box {
      align-items: flex-start;
    }

    .profile {
      width: 100px;
      height: 100px;
    }

    .info {
      margin-left: 16px;
      line-height: 1.4;

      h3 {
        margin: 0 0 4px;
        font-size: 1.6rem;
      }
    }

    p {
      margin: 0 0 10px;
      font-size: 1.3rem;
    }

    ul {
      font-size: 1.2rem;
    }

    address {
      line-height: 1.6;
    }
  }
}
</style>
