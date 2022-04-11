<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" width="340" absolute bottom temporary>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-btn plain @click="openModal(item)" v-text="item.title" />
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
    <template v-for="(item, i) in items">
      <v-dialog :key="i" v-model="item.dialog" max-width="640">
        <v-card>
          <v-card-title class="text-h5">
            {{ item.title }}
            <v-spacer />
            <v-btn icon @click="item.dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text v-html="item.content" />
        </v-card>
      </v-dialog>
    </template>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { marked } from 'marked'

export default Vue.extend({
  name: 'DefaultLayout',
  data: () => ({
    items: [
      {
        title: 'Подать обращение',
        dialog: false,
      },
      {
        title: 'Полезные ссылки по экологии',
        dialog: false,
        contentUrl: '/info/links.md',
      },
      {
        title: 'Химический анализ воды',
        dialog: false,
        contentUrl: '/info/proba.md',
      },
      {
        title: 'Контактная информация',
        dialog: false,
        contentUrl: '/info/contacts.md',
      },
    ],
    drawer: false,
  }),
  methods: {
    openModal(item) {
      if (item.content) {
        item.dialog = true
        this.drawer = false
        return
      }
      if (!item.contentUrl) {
        this.drawer = false
        return
      }
      this.$axios.get(item.contentUrl).then(({ data }) => {
        item.content = marked.parse(data)
        this.openModal(item)
      })
    },
  },
})
</script>

<style lang="scss">
html {
  overflow: hidden !important;
}
#app {
  background: url('/saw.png') center center no-repeat;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.logo {
  height: 100%;
  margin-left: -48px;
  img {
    max-height: 100%;
  }
}
</style>
