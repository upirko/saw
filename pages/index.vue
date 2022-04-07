<template>
  <div class="map">
    <yandex-map v-if="isMounted" :coords="coords" :zoom="zoom" :options="mapOptions" :controls="[]" @click="onMapClick" @map-was-initialized="mapLoaded"/>
  </div>
</template>

<script>
import { yandexMap } from 'vue-yandex-maps'
import * as areas from '~/assets/areas.json'

export default {
  components: { yandexMap },
  data: () => ({
    coords: [63.83277761814573, 32.821460812668604],
    zoom: 7,
    mapOptions: {
      // maxZoom: 7,
    },
    isMounted: false
  }),
  // watch: {
  //   coords() {
  //     console.log(this.coords);
  //   }
  // },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    onMapClick(e) {
      // console.log(e.get('coords'));
    },
    mapLoaded(map) {
      areas.forEach(a => {
        const p = new window.ymaps.Polygon([a.polygon], { hintContent: a.name }, { strokeColor: '#054d3b', strokeWidth: 2, fillColor: '#799e29', fillOpacity: 0.3 });
        map.geoObjects.add(p);
      });
      map.geoObjects.events.add('click', (e) => {
        const target = e.get('target');
        console.log(target.hint);
      });
      // const myPolygon = new window.ymaps.Polygon(
      //   [[[32.4155119,65.0177762],[32.4821172,64.9858095],[32.6913695,64.8851315],[32.866934,64.8003696],[32.8772587,64.8028815],[32.902333,64.786969],[32.9500251,64.780565],[32.9557867,64.7944726],[32.9769124,64.8095992],[33.0479717,64.830844],[33.0690974,64.8283935],[33.1094283,64.878991],[33.2135426,64.8748836],[33.5251731,64.8625859],[33.7604846,64.8532961],[33.839226,64.8537041],[33.9208481,64.8545202],[34.053364,64.8496234],[34.0696884,64.845542],[34.175317,64.8435011],[34.5133285,64.8337025],[34.5882288,64.8328858],[34.5949507,64.8239004],[34.6448842,64.8243089],[34.6909767,64.8153206],[34.725546,64.8132774],[34.773559,64.8112341],[34.8234926,64.8136861],[34.8926313,64.818998],[34.9127967,64.8304356],[34.9704123,64.8275766],[35.0174651,64.8304356],[35.127895,64.8288019],[35.3145291,64.8619393],[35.594345,64.9115449],[35.5607503,64.9567542],[35.4674113,65.0000863],[35.4169437,65.1332918],[35.4073947,65.1584209],[35.3435281,65.2408644],[35.2695977,65.3359789],[35.2769066,65.417206],[35.2892176,65.5534561],[35.2999688,65.6718638],[35.3092862,65.7740447],[35.3194282,65.8848095],[35.3283914,65.9823044],[35.080949,66.069578],[34.842512,66.1533929],[34.5667771,66.0456581],[34.5473108,65.9505491],[34.5269318,65.8506008],[34.5094388,65.7644952],[34.4991748,65.7138385],[34.1699433,65.7229481],[33.8369794,65.7321577],[33.8310348,65.6978568],[33.8021368,65.5304615],[33.7910068,65.4657013],[33.7855095,65.433656],[33.6167414,65.437329],[33.4109164,65.4418078],[33.1550155,65.4473752],[32.7730113,65.4556839],[32.7256759,65.4046789],[32.7506427,65.3698849],[32.7487222,65.3498674],[32.7083912,65.3506684],[32.6728616,65.3294339],[32.6863053,65.3238219],[32.6189755,65.3006862],[32.6086694,65.2971431],[32.5509086,65.2772766],[32.6207855,65.2424908],[32.7380719,65.1840006],[32.7890531,65.1585362],[32.5748046,65.0778929],[32.4155119,65.0177762]].map(r => r.reverse())]
      // , {
      //   hintContent: "Многоугольник"
      // }, {
      //   fillColor: '#00FF0088',
      //   strokeWidth: 5
      // });
      // map.geoObjects.add(myPolygon);
      // window.ymaps.borders.load('RU', {
      //   lang: 'ru',
      //   quality: 3
      // }).then(function (result) {
      //   // console.log(result.features)
      //   const regions = result.features.reduce(function (acc, feature) {
      //     if (feature.properties.iso3166 !== 'RU-KR') return acc;

      //     const iso = feature.properties.iso3166;
      //     feature.id = iso;
      //     feature.options = {
      //         fillOpacity: 0.0,
      //         strokeColor: '#0F0',
      //         strokeOpacity: 1,
      //         strokeWidth: 5,
      //     };
      //     acc[iso] = feature;
      //     return acc;
      //   }, {});

      //   result.features = [];
      //   for (const reg in regions) {
      //     result.features.push(regions[reg]);
      //   }

      //   const objectManager = new window.ymaps.ObjectManager();
      //   objectManager.add(result);
      //   map.geoObjects.add(objectManager);
      // });
      // window.ymaps.geocode('Карелия', {
      //   results: 1  
      // }).then((res) => {

      //   const firstGeoObject = res.geoObjects.get(0);
      //   const coords = firstGeoObject.geometry.getCoordinates();

      //   console.log(coords);

      //   window.ymaps.borders.load('RU').then((geojson) => {
      //     console.log(geojson);
      //   }, (e) => {  
      //     console.log(e);
      //   });
      // });
    }
  }
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
</style>