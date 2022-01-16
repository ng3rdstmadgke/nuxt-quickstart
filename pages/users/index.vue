<template>
<div>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Name</th>
          <th class="text-left">更新</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in $data.users" v-bind:key="user.id">
          <td>{{ user.id }}</td>
          <!-- 
            属性に変数を展開したい場合はv-bindを利用する
            https://jp.vuejs.org/v2/guide/syntax.html#%E5%B1%9E%E6%80%A7
          -->
          <td><nuxt-link v-bind:to="`/users/${user.id}`">{{ user.username }}</nuxt-link></td>
          <td><v-btn v-bind:to="`/users/${user.id}/edit`">edit</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <div class="mt-3">
    <v-container>
      <v-row>
        <v-col>
          <v-btn block color="primary" to="/users/create">Create</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</div>
</template>

<script>
import Common from '@/plugins/common'
/**
 * プロパティ一覧
 * https://nuxtjs.org/docs/directory-structure/pages/#properties
 */
export default {
  data() {
    return {
    }
  },
  /**
   * dataに非同期なデータを保存するためのプロパティ
   * 
   * asyncDataは返却された値(オブジェクト)をコンポーネントのdataにマージされ、
   * asyncDataフックから返却されるpromiseはルートの繊維の間に解決される。
   * asyncDataは this(コンポーネントインスタンス) にアクセスできないため、引数の context を利用する
   * https://nuxtjs.org/ja/docs/features/data-fetching/#async-data
   */
  async asyncData(context) {
    return context.$axios.get("http://127.0.0.1:8000/api/v1/open/users/")
      .then(res => {
        return {users: res.data}
      })
      .catch(e => {
        Common.redirectErrorPage(context, e)
      })
  },
}
</script>
