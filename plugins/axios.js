/**
 * https://nuxtjs.org/ja/docs/directory-structure/plugins
 * 
 * @nuxtjs/axios のプラグインを定義する
 * 
 * - プラグインの登録
 # export default {
 #   modules: [
 #     '@nuxtjs/axios',
 #   ],
 #   plugins: [
 #     '@/plugins/axios.js',
 #   ],
 */

import Auth from '@/plugins/auth'
export default function ({$axios, $cookies, redirect, error }) {
  // リクエストが失敗したときの共通処理を定義
  $axios.onError(e => {
    let log = {
      status: e.response.status,
      statusText: e.response.statusText,
      url: e.response.config.url,
      request_header: e.response.config.headers,
      request_data: e.response.config.data,
      response_header: e.response.headers,
      response_data: e.response.data,
    }
    // console.log(e.response)
    console.error(log)
    /*
    if (e.response.status >= 500) {
      // redirectが使えるのは middleware, asyncData, fetch, plugin
      redirect('/5xx')
    }
    */
  })

  // リクエスト時の共通処理を定義
  // cookieにアクセストークンがあればAuthorizationヘッダを付与する
  $axios.onRequest(config => {
    // console.log(config)
    if (Auth.authenticated($cookies)) {
      let token = Auth.getAccessToken($cookies)
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }
  })
}