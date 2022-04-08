<template>
  <div class="map">
    <yandex-map
      v-if="isMounted"
      :coords="coords"
      :zoom="zoom"
      :options="mapOptions"
      :controls="[]"
      @click="onMapClick"
      @map-was-initialized="mapLoaded"
    />
  </div>
</template>

<script>
import { yandexMap } from 'vue-yandex-maps'

export default {
  components: { yandexMap },
  data: () => ({
    coords: [63.83277761814573, 32.821460812668604],
    zoom: 7,
    mapOptions: {
      // maxZoom: 7,
    },
    areas: [],
    isMounted: false,
  }),
  async fetch() {
    this.areas = await this.$axios.$get('/areas.json')
  },
  fetchOnServer: false,
  // watch: {
  //   coords() {
  //     console.log(this.coords);
  //   }
  // },
  mounted() {
    this.isMounted = true
  },
  methods: {
    onMapClick(e) {
      // console.log(e.get('coords'));
    },
    mapLoaded(map) {
      this.areas.forEach((a, index) => {
        const p = new window.ymaps.Polygon(
          [a.polygon],
          {
            balloonContentHeader: a.name,
            balloonContentBody: `
              <ul>
                <li>
                  Количество свалок: <strong>${a.dumpsCount}</strong>
                </li>
                <li>
                  Уровень загрязнения: <strong>${a.pollutionLevel}</strong>
                </li>
              </ul>
            `,
          },
          {
            strokeColor: '#054d3b',
            strokeWidth: 2,
            fillColor: '#799e29',
            fillOpacity: 0.3,
          }
        )
        map.geoObjects.add(p)
      })
      map.geoObjects.events.add('click', (e) => {
        const target = e.get('target')
        console.log(target.hint)
      })
    },
  },
}
</script>

<style lang="scss">
.map {
  width: 100%;
  height: 100%;
}
.ymap-container {
  height: 100%;
}
ul {
  list-style: none;
  margin: 0 !important;
  padding: 0 !important;
  li {
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>