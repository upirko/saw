<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" router exact>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <div class="logo">
        <img src="/logo_header.png" />
      </div>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DefaultLayout',
  data: () => ({
    items: [
      {
        icon: 'mdi-apps',
        title: 'Подать обращение',
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Полезные ссылки по экологии',
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Контактная информация',
      },
    ],
    drawer: false,
  }),
})
</script>

<style lang="scss" scoped>
#app {
  background: url('/saw.png') center center no-repeat;
}
.logo {
  height: 100%;
  margin-left: -48px;
  img {
    max-height: 100%;
  }
}
</style>
