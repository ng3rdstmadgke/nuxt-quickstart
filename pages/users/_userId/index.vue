<template>
<div>
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
          <td>{{ $data.response.user.id }}</td>
        </tr>
        <tr>
          <td>username</td>
          <td>{{ $data.response.user.username }}</td>
        </tr>
        <tr>
          <td>is_active</td>
          <td>{{ $data.response.user.is_active }}</td>
        </tr>
        <tr>
          <td>is_superuser</td>
          <td>{{ $data.response.user.is_superuser }}</td>
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

export default {
  data() {
    return {
      dialogMessage: "本当に削除しますか"
      
    }
  },
  components: {
    ConfirmDialog
  },
  methods: {
    openDeleteConfirmDialog(id) {
      // ConfirmDialogタグのref属性のconfirmを指定している
      this.$refs.confirm.open()
    },
    async confirmDeletion() {
      await this.$store.dispatch("users/deleteUser", this.$route.params.userId);
      this.$router.push({path: "/users"})
    }
  },
  async asyncData(context) {
    // contestのメンバ: https://nuxtjs.org/docs/internals-glossary/context/
    //                  https://develop365.gitlab.io/nuxtjs-2.8.X-doc/ja/api/context/
    // TODO: ユーザー取得エラー時の処理
    let response = await context.$axios.get(`http://127.0.0.1:8000/api/v1/open/users/${context.params.userId}`)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data)
          return {user: res.data}
        } else {
          return {}
        }
      })
      return {response: response}
  },
}
</script>