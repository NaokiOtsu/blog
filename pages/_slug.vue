<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <p class="date">{{ format(date, 'YYYY-MM-DD') }}</p>
    <!-- eslint-disable -->
    <div class="contents" v-html="content"></div>

    <no-ssr>
      <div class="sns">
        <div class="twitter">
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            class="twitter-share-button"
            data-show-count="false"
          >
            Tweet
          </a>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          ></script>
        </div>

        <div class="hatena">
          <a
            href="http://b.hatena.ne.jp/entry/"
            class="hatena-bookmark-button"
            data-hatena-bookmark-layout="basic-label-counter"
            data-hatena-bookmark-lang="ja"
            title="このエントリーをはてなブックマークに追加"
          >
            <img
              src="https://b.st-hatena.com/images/entry-button/button-only@2x.png"
              alt="このエントリーをはてなブックマークに追加"
              width="20"
              height="20"
              style="border: none;"
            />
          </a>
          <script
            type="text/javascript"
            src="https://b.st-hatena.com/js/bookmark_button.js"
            charset="utf-8"
            async="async"
          ></script>
        </div>
      </div>
      <adsbygoogle />
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { format } from 'date-fns'

@Component({
  // beforeCreate() {
  //   if (process.browser) {
  //     location.href = `https://naoki-otsu.com${this.$route.path}`
  //   }
  // },

  async asyncData({ params }) {
    const fileContent = await require(`~/markdown/${params.slug}.md`)
    return {
      content: fileContent.default,
    }
  },

  head() {
    const head = {
      title: `${this.title} | Naoki Otsu`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.body,
        },
        {
          name: 'twitter:card',
          content: this.image ? 'summary_large_image' : 'summary',
        },
        {
          name: 'og:title',
          content: this.title,
        },
        {
          name: 'og:description',
          content: this.body,
        },
        {
          name: 'og:image',
          content: this.image || 'https://blog.naoki-otsu.com/icon.png',
        },
      ],
    }

    return head
  },
})
export default class Slug extends Vue {
  format = format

  created() {
    const post = this.$store.state.posts.find(
      post => post.fileName === this.$route.path.replace(/\//g, ''),
    )
    this.$store.commit('setPost', post)
  }

  get title() {
    return this.$store.state.post.attributes.title
  }

  get date() {
    return this.$store.state.post.attributes.date
  }

  get body() {
    return this.$store.state.post.body.replace(/\r?\n/g, '')
  }

  get image() {
    return this.$store.state.post.attributes.image
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables.scss';

.container {
  max-width: $width;
  margin: 50px auto;
  font-size: 1.6rem;

  h1 {
    font-size: 4.2rem;
    line-height: 5.7rem;
    font-weight: 600;
  }

  .date {
    text-align: right;
  }

  .contents {
    margin-bottom: 40px;
    color: #4b4f56;

    /deep/ h1 {
      margin: 60px 0 10px;
      padding-bottom: 10px;
      font-size: 2.6rem;
      line-height: 4.2rem;
      border-bottom: 2px solid #efefef;
    }

    /deep/ h2 {
      margin: 40px 0 0;
      font-size: 2rem;
      line-height: 3rem;
    }

    /deep/ ul {
      margin-top: 24px;
    }

    /deep/ li {
      margin-bottom: 4px;
    }

    /deep/ img {
      display: inline-block;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    /deep/ p {
      margin: 20px 0 4px;
    }

    /deep/ a {
      text-decoration: underline;
    }

    /deep/ p code,
    /deep/ ul code {
      margin: 0 4px;
      color: #ca454e;
    }

    /deep/ .hljs {
      padding: 1em 24px;
      background-color: #364549;
    }

    /deep/ .touchlife-img {
      width: 340px;
    }
  }

  .sns {
    display: flex;
    align-items: center;
  }

  .twitter {
    margin-right: 10px;
  }
}

// for SP
@media (max-width: $width + (10px * 2)) {
  .container {
    margin: 20px auto;
    padding: 0 16px;

    h1 {
      margin: 0 0 10px;
      font-size: 2.2rem;
      line-height: 3rem;
    }

    .date {
      margin: 0;
      font-size: 1.3rem;
    }

    .contents {
      line-height: 1.6;

      /deep/ h1 {
        margin: 40px 0 0;
        padding-bottom: 6px;
        font-size: 2rem;
        line-height: 3rem;
        border-bottom: 2px solid #efefef;
      }

      /deep/ h2 {
        margin: 30px 0 0;
        font-size: 1.6rem;
        line-height: 2.2rem;
      }

      /deep/ img {
        width: 100%;
      }

      /deep/ p {
        margin-top: 12px;

        code {
          white-space: normal;
        }
      }

      /deep/ ul {
        margin-top: 16px;
        padding-left: 30px;
      }

      /deep/ li {
        margin-bottom: 4px;
      }

      /deep/ pre {
        overflow: auto;
        word-wrap: normal;
        white-space: pre;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
      }

      /deep/ pre {
        margin: 12px -16px;
      }

      /deep/ .hljs {
        padding: 1em 16px;
        -webkit-text-size-adjust: none;
      }

      /deep/ .touchlife-img {
        width: 245px;
      }
    }
  }
}
</style>
