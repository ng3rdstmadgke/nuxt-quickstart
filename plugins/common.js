/**
 * 共通関数を定義
 * https://nuxtjs.org/ja/docs/directory-structure/plugins
 * 
 * プラグインの登録
 * ```nuxt.config.js
 * export default {
 *   plugins: ['@/plugins/common.js']
 * }
 * ```
 * 
 * 共通関数の利用
 * ```pages/index.vue
 * <script>
 * import Common from '@/plugins/common'
 * 
 * export default {
 *   created {
 *     Common.get(...)
 *   }
 * }
 * </script>
 */
// const axios = require('axios');

export default {
  /**
   *  サーバーサイドでリクエストエラーになった場合にログを表示しつつ、エラーページにリダイレクトする
   * @param {*} context 
   * @param {*} e 
   */
  redirectErrorPage(context, e) {
    // layout/error.vueへの遷移: https://nuxtjs.org/ja/docs/internals-glossary/context#error
    context.error({
      statusCode: e.response.status,
      message: e.response.statusText,
    })
  },
  /**
   * フロントサイドでリクエストエラーになった場合にalertに表示するメッセージを取得する
   * @param {} e 
   * @returns 
   */
  getAlertMessage(e) {
    // エラー内容をJSONで見たいとき
    // console.error(e.toJSON())
    if (e.response) {
      return `${e.response.status} ${e.response.statusText}: ${e.response.data.detail}`
    } else {
      return `An error occurred: ${e.message}`
    }
  },

  
}