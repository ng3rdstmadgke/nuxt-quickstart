<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in $store.state.users.list" v-bind:key="user.id">
          <td>{{ user.id }}</td>
          <!-- 
            属性に変数を展開したい場合はv-bindを利用する
            https://jp.vuejs.org/v2/guide/syntax.html#%E5%B1%9E%E6%80%A7
          -->
          <td><nuxt-link v-bind:to="`/users/${user.id}`">{{ user.username }}</nuxt-link></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
/**
 * プロパティ一覧
 * https://nuxtjs.org/docs/directory-structure/pages/#properties
 */
export default {
  data() {
    return {
      "foo": "bar"
    }
  },
  /**
   * 取得してきたデータをdata変数として扱いたい時に利用する
   *  asyncDataはPromiseを返し、promiseの中でdata()オプションと同様にオブジェクトを返す
   * サーバー側で実行されるので、内部で this を利用することはできない。引数のcontextを利用する
   * https://negalog.com/nuxt-js-fetch-data/
   */
  async asyncData(context) {
    console.log(context)
    
  },
  /**
   * 取得してきたデータをdata変数として扱いたい時
   * https://negalog.com/nuxt-js-fetch-data/
   */
  async fetch(context) {
    await context.store.dispatch("users/getAll")
  }
}
</script>
