<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in $store.state.users" v-bind:key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  asyncData(context) {
    return {}
  },
  async fetch() {
    // await this.$store.dispatch("users/getAll")
    await this.$store.dispatch("getUsersAll")
    console.log("fetch", this.$store.state.users)
  }
}
</script>
