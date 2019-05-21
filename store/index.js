export const state = () => ({
  posts: [],
  post: {
    attributes: {
      title: '',
      date: null,
    },
    body: '',
    fileName: '',
    frontmatter: '',
  },
})

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },

  setPost(state, post) {
    state.post = post
  },
}
