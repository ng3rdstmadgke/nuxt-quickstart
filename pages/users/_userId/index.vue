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
</template>

<script>
export default {
  data() {
    return {
    }
  },
  async asyncData(context) {
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