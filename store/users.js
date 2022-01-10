export const state = () => ({
  list: [],
  user: {},
})

export const mutations = {
  setList(state, users) {
    state.list = users
  },
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async getAll(context) {
    await this.$axios.get("//localhost:8000/api/v1/open/users/")
      .then((res) => {
        if (res.status == 200) {
          context.commit("setList", res.data)
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  async getUser(context, id) {
    await this.$axios.get(`//localhost:8000/api/v1/open/users/${id}`)
      .then((res) => {
        if (res.status == 200) {
          context.commit("setUser", res.data)
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
}