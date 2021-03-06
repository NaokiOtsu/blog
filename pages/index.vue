<template>
  <section>
    <ul>
      <li v-for="(post, index) in posts" v-once :key="index">
        <p v-if="showMonth(post.attributes.date, index)" class="month">
          {{ year }}
        </p>
        <div class="contents">
          <p class="date">
            {{ format(post.attributes.date, 'YYYY-MM-DD') }}
          </p>
          <nuxt-link :to="`/${post.fileName}/`">
            <p class="title">{{ post.attributes.title }}</p>
          </nuxt-link>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import 'vuex'
import { Vue, Component } from 'vue-property-decorator'
import { format } from 'date-fns'

@Component({
  head() {
    return {
      title: `Blog | Naoki Otsu`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.body,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'og:title',
          content: `Blog | Naoki Otsu`,
        },
        {
          name: 'og:description',
          content: this.body,
        },
        {
          name: 'og:image',
          content: 'https://blog.naoki-otsu.com/icon.png',
        },
      ],
    }
  },
})
export default class Index extends Vue {
  format = format
  year = ''

  get posts() {
    return this.$store.state.posts
  }

  showMonth(date) {
    const year = format(date, 'YYYY')
    if (year === this.year) {
      return false
    } else {
      this.year = year
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables.scss';

section {
  max-width: $width;
  min-height: 400px;
  margin: 50px auto 70px;
  padding: 0 10px;
  font-size: 1.4rem;

  ul {
    margin: 0 0 0 10px;
    padding: 0;
    list-style: none;
  }

  li {
    margin-bottom: 20px;
  }

  .contents {
    display: flex;
    align-items: center;
  }

  p {
    margin: 0;
  }

  .month {
    margin: 50px 0 20px 0;
    font-size: 2.4rem;
    font-weight: bold;
  }

  .date {
    width: 90px;
    margin-right: 20px;
    white-space: nowrap;
  }

  .title {
    font-size: 2rem;
  }
}

// for SP
@media (max-width: $width + (10px * 2)) {
  section {
    margin: 20px auto 30px;

    h1 {
      margin: 0 0 20px;
      font-size: 2rem;
      line-height: 1.4;
    }

    li {
      margin-bottom: 20px;
    }

    .contents {
      display: block;
    }

    .month {
      margin: 0 0 10px 0;
      font-size: 2rem;
      font-weight: bold;
    }

    .date {
      font-size: 1.4rem;
    }

    .title {
      font-size: 1.6rem;
      line-height: 1.4;
    }

    a {
      display: inline-block;
    }
  }
}
</style>
