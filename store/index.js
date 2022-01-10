export const state = () => ({
  users: []
})

export const mutations = {
  setUsers(state, users) {
    console.log("setUsers", state.users)
    state.users = users
  },
}

export const actions = {
  async getUsersAll(context) {
    await this.$axios.get("//localhost:8000/api/v1/open/users/")
      .then((res) => {
        if (res.status == 200) {
          console.log("getUsersAll", res.data)
          context.commit("setUsers", res.data)
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
}