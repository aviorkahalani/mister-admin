<template>
  <div>
    <v-app-bar color="indigo accent-2" dense dark app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span @click="$router.push('/')">misterAdmin</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title class="d-flex align-center" @click="$router.push('/')">
              <v-icon left>mdi-home</v-icon>
              <span>Home</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="d-flex align-center" @click="$router.push('/about')">
              <v-icon left>mdi-information</v-icon>
              <span>About</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'app-header',
}
</script>
