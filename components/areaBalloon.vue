<template>
  <v-list>
    <v-list-item>
      Количество свалок: <strong>{{ data.dumpsCount }}</strong>
    </v-list-item>
    <v-list-item>
      Уровень загрязнения: <strong>{{ data.pollutionLevel }}</strong>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'AreaBalloon',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>