<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" width="340" absolute bottom temporary>
      <v-list>
        <v-list-item v-for="(item, i) in navs" :key="i">
          <v-btn plain @click="openModal(item)">{{ item.title }}</v-btn>
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
    <template v-for="(item, i) in navs">
      <v-dialog v-if="item.target" :key="i" v-model="item.dialog" max-width="640">
        <v-card>
          <v-card-title class="text-h5">
            {{ item.title }}
            <v-spacer />
            <v-btn icon @click="item.dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text v-show="item.content">
            <nuxt-content :document="item.content" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({
    navs: [],
    drawer: false,
  }),
  async fetch () {
    const pages = await this.$content('/nav').only(['title', 'path']).fetch()
    this.navs.push(...pages.map(p => ({
      title: p.title,
      dialog: false,
      target: p.path,
    })))
  },
  methods: {
    openModal(item) {
      if (item.content) {
        item.dialog = true
        this.drawer = false
        return
      }
      if (!item.target) {
        this.drawer = false
        return
      }
      this.$content(item.target).fetch().then((data) => {
        item.content = data
        this.openModal(item)
      })
    },
  },
}
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
