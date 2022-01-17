<template>
  <v-app dark>
    <div class="text-h1">
      <!--
        statusCode, messageパラメータは必須
        https://nuxtjs.org/ja/docs/internals-glossary/context#error
      -->
      {{ $props.error.statusCode }} {{ $props.error.message }}
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  // headタグの要素を定義
  // https://nuxtjs.org/ja/docs/components-glossary/head/
  head () {
    return {
      title: `${this.error.statusCode} ${this.error.message}`
    }
  }
}
</script>