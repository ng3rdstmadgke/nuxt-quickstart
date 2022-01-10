<template>
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
          <td>{{ $store.state.users.user.id }}</td>
        </tr>
        <tr>
          <td>username</td>
          <td>{{ $store.state.users.user.username }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  asyncData(context) {
  },
  async fetch(context) {
    await context.store.dispatch("users/getUser", context.params.userId)
  }
}
</script>