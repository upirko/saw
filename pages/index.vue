<template>
  <div class="map" :class="{ ready: !!ymap }">
    <yandex-map
      v-if="isMounted"
      :coords="coords"
      :zoom="zoom"
      :options="mapOptions"
      :controls="[]"
      @map-was-initialized="mapLoaded"
    >
      <template v-for="(o, index) in objects">
        <ymap-marker
          v-if="o.type === 'rill' && showRills || o.type === 'park' && showParks"
          :key="index"
          :coords="o.coords"
          :marker-id="index"
          :balloon-template="objectBalloon(o)"
          :icon="o.type === 'rill' ? rillIcon : parkIcon"
        />
      </template>
    </yandex-map>
    <div v-if="!!ymap" class="controls">
      <div>
        <v-switch v-model="showRills" label="Отображать родники" />
      </div>
      <div>
        <v-switch v-model="showParks" label="Отображать заповедники" />
      </div>
    </div>
    <div v-if="!!ymap" class="legend">
      <h4>Состояние окружающей среды</h4>
      <div>
        <div v-for="level in pollutionLevels" :key="level.color" :style="{'background-color': convertHex(level.color, 0.3)}">
          {{ level.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { yandexMap } from 'vue-yandex-maps'

const POLLUTION_LEVELS = [
  { title: 'Критическое', color: '#ff0000' },
  { title: 'Неудовлетворительное', color: '#ffc000' },
  { title: 'Удовлетворительное', color: '#ffff00' },
  { title: 'Нормальное', color: '#92d050' },
]

export default {
  components: { yandexMap },
  data: () => ({
    coords: [63.83277761814573, 32.821460812668604],
    zoom: 7,
    mapOptions: {
      // maxZoom: 7,
    },
    areas: [],
    objects: [],
    rillIcon: {
      layout: 'default#image',
      imageHref: '/rill.png',
      imageSize: [30, 38],
      imageOffset: [-15, -19],
    },
    parkIcon: {
      layout: 'default#image',
      imageHref: '/park.png',
      imageSize: [38, 38],
      imageOffset: [-19, -19],
    },
    isMounted: false,
    ymap: null,
    showRills: false,
    showParks: false,
    pollutionLevels: POLLUTION_LEVELS
  }),
  async fetch() {
    this.areas = await this.$axios.$get('/areas.json')
    this.objects = await this.$axios.$get('/objects.json')
  },
  fetchOnServer: false,
  mounted() {
    this.isMounted = true
  },
  methods: {
    objectBalloon(object) {
      let template = `<h3>${object.name}</h3>`
      if (object.description?.length) {
        template += `<p>${object.description}</p>`
      }
      return template
    },
    mapLoaded(map) {
      this.ymap = map
      this.areas.forEach((a) => {
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
                  Состояние окружающей среды: <strong>${POLLUTION_LEVELS[a.pollutionLevel].title}</strong>
                </li>
              </ul>
            `,
          },
          {
            strokeColor: '#054d3b',
            strokeWidth: 2,
            fillColor: POLLUTION_LEVELS[a.pollutionLevel].color,
            fillOpacity: 0.3,
          }
        )
        map.geoObjects.add(p)
      })
      // map.geoObjects.events.add('click', (e) => {
      //   const target = e.get('target')
      // })
    },
    convertHex(color, opacity) {
      const r = parseInt(color.substring(1, 3), 16)
      const g = parseInt(color.substring(3, 5), 16)
      const b = parseInt(color.substring(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity ?? 1})`
    }
  },
}
</script>

<style lang="scss">
.map {
  width: 100%;
  height: 100%;
  position: relative;
  &.ready {
    background-color: white;
  }
}
.ymap-container {
  height: 100%;
}
.legend,
.controls {
  position: absolute;
  right: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 2;
}
.controls {
  top: 20px;
  padding: 10px 20px;
}
.legend {
  bottom: 40px;
  padding: 10px;
  & > div {
    display: flex;
    border: 1px solid #3a3f35;
    & > * {
      padding: 5px 10px;
      color: #3a3f35;
    }
  }
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