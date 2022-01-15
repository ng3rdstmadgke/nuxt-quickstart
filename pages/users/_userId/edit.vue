<template>
<div>
  <form>
   <!-- $touch: $dirtyフラグを trueにする -->
    <v-text-field
      v-model="$data.username"
      :error-messages="usernameErrors"
      :counter="30"
      label="Username"
      required
      @input="$v.username.$touch()"
      @blur="$v.username.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Password"
      required
      type="password"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit" >submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</div>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, minLength } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    data() {
      return {
        password: ""
      }
    },

    validations: {
      username: { required, maxLength: maxLength(30) },
      password: { required, maxLength: maxLength(30), minLength: minLength(8) },
    },

    computed: {
      usernameErrors () {
        const errors = []
        // ユーザーに編集されていなければエラーメッセージは返さない
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.maxLength && errors.push('Usernameは30文字以内で入力してください')
        !this.$v.username.required && errors.push('Usernameを入力してください')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.maxLength && errors.push('Passwordは30文字以内で入力してください')
        !this.$v.password.minLength && errors.push('Passwordは8文字以上で入力してください')
        !this.$v.password.required && errors.push('Passwordを入力してください')
        return errors
      },
    },

    async asyncData(context) {
      // contestのメンバ: https://nuxtjs.org/docs/internals-glossary/context/
      //                  https://develop365.gitlab.io/nuxtjs-2.8.X-doc/ja/api/context/
      let response = await context.$axios.get(`http://127.0.0.1:8000/api/v1/open/users/${context.params.userId}`)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            return {username: res.data.username}
          } else {
            return {}
          }
        })
        return response
    },

    methods: {
      async submit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          console.log("error...")
        } else {
          let data = {
            username: this.username,
            password: this.password,
          }
          console.log(this.$route.params.userId)
          // 現在のURLを取得する: https://qiita.com/TK-C/items/caab322156872d546331
          // this.$route

          // actionsに複数の引数を渡したいときはObject形式で
          let response = await this.$store.dispatch("users/editUser", {userId: this.$route.params.userId, data: data});
          if (response.status == 200) {
            console.log(`success: ${response.status}`)
            this.$router.push({path: "/users"})
          } else {
            // TODO: エラーメッセージを出す
            console.log(`error: ${response.status}`)
          }
        }
      },
      clear () {
        this.$v.$reset()
        this.username = ''
      },
    },
  }
</script>
