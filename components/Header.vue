<template>
  <header>
    <h1>
      <nuxt-link to="/">Naoki <span>Otsu</span></nuxt-link>
    </h1>
    <nav>
      <ul>
        <li>
          <nuxt-link to="/">Blog</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/profile/">Profile</nuxt-link>
        </li>
        <li>
          <a href="https://twitter.com/melo15" target="_blank" rel="noopener"
            >Twitter</a
          >
        </li>
        <li>
          <a href="https://github.com/NaokiOtsu" target="_blank" rel="noopener"
            >Github</a
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
@import '~/assets/css/variables.scss';

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px 10px;
  color: white;
  background: #333;
  border-bottom: 1px solid black;

  a {
    color: white;
  }

  h1 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: normal;
    line-height: 1.2;

    a:hover {
      text-decoration: none;
    }

    span {
      margin-right: 2px;
      font-weight: bold;
    }
  }

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    font-size: 1.4rem;
    list-style-type: none;
  }

  li {
    margin-left: 20px;
  }
}

// for SP
@media (max-width: $width + (10px * 2)) {
  header {
    li {
      margin-left: 8px;
    }
  }
}
</style>
