
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
// vuelidateドキュメント: https://vuelidate.js.org/
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

import Alert from '~/components/Alert'
import Common from '@/plugins/common'

/**
 * バリデータ: https://vuelidate.js.org/#validators
 *   required: 必須入力
 *   minLength, maxLength: 最小文字数・最大文字数
 *   minValue, maxValue: 最小値・最大値
 * 
 * バリデーションステート: https://vuelidate.js.org/#sub-v-values
 *   $dirty:
 *     対象のフィールドが少なくとも一回はユーザーに変更されたかどうかをあらわすフラグ。
 *     ユーザーに対してエラーメッセージ等を表示するかどうかのフラグとして利用される。
 *
 * バリデーションメソッド: https://vuelidate.js.org/#sub-v-methods
 *   $touch:
 *     対象の $dirty ステートをtrueにする
 *   $reset:
 *     対象の $dirty ステートをリセットする
 *   $validate:
 *      すべてのプロパティを $dirty = true にし、すべてのバリデーションを行う。
 *       バリデーション完了後 Promise<Boolean> を返却する
 */

export default {
  mixins: [validationMixin],
  middleware: ['auth'], // middleware/auth.js

  data: () => ({
    username: '',
    password: '',
    alertMessage: "",
  }),

  components: {
    Alert: Alert
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

  methods: {
    async submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log("error...")
      } else {
        let data = {
          username: this.username,
          password: this.password
        }
        this.$axios.post("//127.0.0.1:8000/api/v1/users/", data)
          .then(res => {
            this.$router.push({path: "/users"})
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
  },
}
</script>