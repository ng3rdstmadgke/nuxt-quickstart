<template>
<div>
  <v-row>
    <v-col class="text-center">
      <VuetifyLogo></VuetifyLogo>
    </v-col>
    <v-col class="text-center">
      <NuxtLogo></NuxtLogo>
    </v-col>
  </v-row>

  <v-list dense>
    <v-subheader>Links</v-subheader>
    <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/login">
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/users/">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title>User</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 1
    }
  }
}
</script>
