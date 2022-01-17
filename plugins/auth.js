/**
 * https://nuxtjs.org/ja/docs/directory-structure/plugins
 * 
 * - プラグインの登録
 * ```nuxt.config.js
 # export default {
 #   plugins: [
 #     '@/plugins/auth.js',
 #   ],
 # }
 # ```

 # - 利用方法
 # ```pages/users/index.vue
 # <script>
 # import Auth from "@/plugins/auth.js"
 # export default {
 #   methods: {
 #     submit() {
 #       // ...略...
 #       Auth.setAccessToken(this.$cookies, token)
 #       // ...略...
 #     }
 #   }
 # }
 # </script>
 # ```
 */
export default {
  token_key: "access_token",

  authenticated(cookie) {
    let payload = this.getPayload(cookie)
    console.log("token payload: ", payload)
    if (payload) {
      let exp = payload["exp"];
      let now = Math.floor((new Date()).getTime() / 1000)
      console.log("exp: ", exp, ", now: ", now)
      if (exp && exp > now) {
        return true
      }
    }
    return false
  },

  logout(cookie) {
    cookie.remove(this.token_key)
  },

  getAccessToken(cookie) {
    return cookie.get(this.token_key)
  },

  setAccessToken(cookie, token) {
    return cookie.set(this.token_key, token)
  },

  getHeader(cookie) {
    let token = this.getAccessToken(cookie)
    if (!token) return null
    let header = token.split(".")[0]
    let decoded = Buffer.from(header, "base64").toString()
    return JSON.parse(decoded)
  },

  getPayload(cookie) {
    let token = this.getAccessToken(cookie)
    if (!token) return null
    let payload = token.split(".")[1]
    let decoded = Buffer.from(payload, "base64").toString()
    return JSON.parse(decoded)
  }

}
/*
export default class Auth {

  constructor(cookie) {
    this.cookie = cookie
    this.token_key = "access_token"
  }
  
  authenticated() {
    // TODO: expireチェック
    console.log(this.getAccessToken())
    return !!this.getAccessToken()
  }

  getAccessToken() {
    return this.cookie.get(this.token_key)
  }

  setAccessToken(token) {
    return this.cookie.set(this.token_key, token)
  }

  getHeader() {
    let token = this.getAccessToken()
    if (!token) return null
    let header = token.split(".")[0]
    return JSON.parse(atob(header))
  }

  getPayload() {
    let token = this.getAccessToken()
    if (!token) return null
    let payload = token.split(".")[1]
    return JSON.parse(atob(payload))
  }
}
*/
/*
var Auth = function(cookie) {
  this.token_key = "access_token";
  this.cookie = cookie;
}

Auth.prototype = {
  authenticated() {
    // TODO: expireチェック
    console.log(this.getAccessToken())
    return !!this.getAccessToken()
  },

  getAccessToken() {
    return this.cookie.get(this.token_key)
  },

  setAccessToken(token) {
    return this.cookie.set(this.token_key, token)
  },

  getHeader() {
    let token = this.getAccessToken()
    if (!token) return null
    let header = token.split(".")[0]
    return JSON.parse(atob(header))
  },

  getPayload() {
    let token = this.getAccessToken()
    if (!token) return null
    let payload = token.split(".")[1]
    return JSON.parse(atob(payload))
  },
}

export default Auth;
*/