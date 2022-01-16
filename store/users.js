/**
 * ページを跨ぐ状態を保持する
 */
export const state = () => ({
  list: [],
  user: {},
})


/**
 * 同期的な処理でstateの更新を行う
 */
export const mutations = {
  setList(state, users) {
    state.list = users
  },
  setUser(state, user) {
    state.user = user
  },
}

/**
 * 非同期処理を行う
 * 
 * pagesからの呼び出し方
 * ```pages/index.vue
 * export default {
 *   methods: {
 *     sample() {
 *       let data = {
 *         userId: 1,
 *         data: {username: "...", password: "..."}
 *       }
 *       this.$store.dispatch("users/editUsers", data)
 *     }
 *   },
 * 
 *   async asyncData(context) {
 *       let data = {
 *         userId: 1,
 *         data: {username: "...", password: "..."}
 *       }
 *     context.store.dispatch("users/editUsers", data)
 *   }
 * }
 * ```
 */
export const actions = {
  async getUsers(context) {
    await context.$axios.get("//127.0.0.1:8000/api/v1/open/users/")
      .then((res) => {
        if (res.status == 200) {
          // 同storeの mutations の setList を呼び出して、レスポンスをstateに保存
          context.commit("setList", res.data)
        }
      })
      .catch(e => {
        console.log(e.toJSON())
      })
  },
  async getUser(context, userId) {
    this.$axios.get(`//127.0.0.1:8000/api/v1/open/users/${userId}`)
      .then((res) => { return res })
      .catch((e) => { console.log(e.toJSON()) })
  },
  async createUser(context, data) {
    return await this.$axios.post("//127.0.0.1:8000/api/v1/open/users/", data)
      .then((res) => { return res })
      .catch((e) => { console.log(e.toJSON()) })
  },
  // actionsに複数の引数を渡したいときはObject形式で渡す
  async editUser(context, {userId, data}) {
    console.log("editUser", data)
    return await this.$axios.put(`//127.0.0.1:8000/api/v1/open/users/${userId}`, data)
      .then((res) => { return res })
      .catch((e) => { console.log(e.toJSON()) })
  },
  async deleteUser(context, userId) {
    return await this.$axios.delete(`//127.0.0.1:8000/api/v1/open/users/${userId}`)
      .then((res) => { return res })
      .catch((e) => { console.log(e.toJSON()) })
  }
}