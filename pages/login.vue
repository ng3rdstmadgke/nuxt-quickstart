<template>
<div>
  <Alert ref="alert" type="error" :message="$data.alertMessage"></Alert>
  <form>
   <!-- $touch: $dirtyフラグを trueにする -->
    <v-text-field
      v-model="username"
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
import { required } from 'vuelidate/lib/validators'

import Alert from '~/components/Alert'
import Common from '@/plugins/common'
import Auth from "@/plugins/auth.js"

export default {
  mixins: [validationMixin],

  data() {
    return {
      username: "",
      password: "",
      alertMessage: "",
    }
  },

  components: {
    Alert: Alert
  },

  validations: {
    username: { required },
    password: { required },
  },

  computed: {
    usernameErrors () {
      const errors = []
      // ユーザーに編集されていなければエラーメッセージは返さない
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Usernameを入力してください')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Passwordを入力してください')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let form = new FormData()
        form.append("username", this.$data.username)
        form.append("password", this.$data.password)
        this.$axios.post("//127.0.0.1:8000/api/v1/token", form)
          .then(res => {
            // console.log(res)
            let token = res.data.access_token
            Auth.setAccessToken(this.$cookies, token)
            // console.log(this.$router)
            // vue router: https://router.vuejs.org/guide/essentials/navigation.html
            this.$router.back()
            //this.$cookies.set("__auth_token", token)
          })
          .catch(e => {
            this.$data.alertMessage = Common.getAlertMessage(e)
            this.$refs.alert.open()
          })
      }
    },
    clear() {
      this.$v.$reset()
      this.username = ''
      this.password = ''
    },
  }
}
</script>
