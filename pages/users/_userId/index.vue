<template>
<div>
  <Alert ref="alert" type="error" :message="$data.alertMessage"></Alert>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Column</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>id</td>
          <td>{{ $data.user.id }}</td>
        </tr>
        <tr>
          <td>username</td>
          <td>{{ $data.user.username }}</td>
        </tr>
        <tr>
          <td>is_active</td>
          <td>{{ $data.user.is_active }}</td>
        </tr>
        <tr>
          <td>is_superuser</td>
          <td>{{ $data.user.is_superuser }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <div class="mt-3">
    <v-container>
      <v-row>
        <v-col>
          <v-btn block v-bind:to="`/users/${$route.params.userId}/edit`">Edit</v-btn>
        </v-col>
        <v-col>
          <v-btn block color="error" v-on:click="openDeleteConfirmDialog($route.params.userId)">Delete</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <!--
    ConfirmDialogコンポーネントの呼び出し
    - ref="..."
      this.$refs.{...} で要素を参照できる
    - v-on:confirm="..."
      confirmはConfirmDialogコンポーネントのconfirm()メソッド内のemitで発生させるイベント
    - 属性
      propに割り当てる値を属性として定義
  -->
  <ConfirmDialog
    ref="confirm"
    title="Delete User"
    :message="$data.dialogMessage"
    buttonMessage="Delete"
    v-on:confirm="confirmDeletion"
  ></ConfirmDialog>
</div>

</template>

<script>
import ConfirmDialog from '~/components/ConfirmDialog'
import Alert from '~/components/Alert'
import Common from '@/plugins/common'

export default {
  middleware: ['auth'], // middleware/auth.js

  data() {
    return {
      dialogMessage: "本当に削除しますか",
      alertMessage: "",
    }
  },

  components: {
    ConfirmDialog: ConfirmDialog,
    Alert: Alert,
  },

  methods: {
    // アイテム削除時のダイアログ表示
    openDeleteConfirmDialog(id) {
      // ConfirmDialogタグのref属性のconfirmを指定している
      // https://zenn.dev/kokota/articles/247d4f61590dab
      // ConfirmDialogコンポーネントのopen()を呼びu出すことでdialogを表示する
      this.$refs.confirm.open()
    },
    async confirmDeletion() {
      this.$axios.delete(`http://127.0.0.1:8000/api/v1/users/${this.$route.params.userId}`)
        .then(_res => {
          this.$router.push({path: "/users"})
        })
        .catch(e => {
          this.$data.alertMessage = Common.getAlertMessage(e)
          this.$refs.alert.open()
        })
    }
  },

  // サーバーサイドの処理
  async asyncData(context) {
    // contestのメンバ: https://nuxtjs.org/docs/internals-glossary/context/
    //                  https://develop365.gitlab.io/nuxtjs-2.8.X-doc/ja/api/context/
    //   contextからaxiosを利用する場合は context.$axios.get(...)
    return context.$axios.get(`http://127.0.0.1:8000/api/v1/users/${context.params.userId}`)
      .then(res => {
        return {user: res.data}
      })
      .catch(e => {
        Common.redirectErrorPage(context, e)
      })
  },
}
</script>