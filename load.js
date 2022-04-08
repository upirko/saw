const fs = require('fs');
const axios = require('axios');

const url = "https://nominatim.openstreetmap.org/search.php?q=Q&polygon_geojson=1&format=json";
const areas = [
  {
    name: 'Беломорский район',
    dumpsCount: 1,
    pollutionLevel: 0,
  },
  {
    name: 'Калевальский район',
    dumpsCount: 0,
    pollutionLevel: 0,
  },
  {
    name: 'Кемский район',
    dumpsCount: 3,
    pollutionLevel: 0,
  },
  {
    name: 'Кондопожский район',
    dumpsCount: 0,
    pollutionLevel: 0,
  },
  {
    name: 'Лахденпохский район',
    dumpsCount: 4,
    pollutionLevel: 0,
  },
  {
    name: 'Лоухский район',
    dumpsCount: 0,
    pollutionLevel: 0,
  },
  {
    name: 'Медвежьегорский район',
    dumpsCount: 5,
    pollutionLevel: 0,
  },
  {
    name: 'Муезерский район',
    dumpsCount: 0,
    pollutionLevel: 0,
  },
  {
    name: 'Олонецкий район',
    dumpsCount: 19,
    pollutionLevel: 0,
  },
  {
    name: 'Питкярантский район',
    dumpsCount: 6,
    pollutionLevel: 0,
  },
  {
    name: 'Прионежский район',
    dumpsCount: 6,
    pollutionLevel: 0,
  },
  {
    name: 'Пряжинский район',
    dumpsCount: 33,
    pollutionLevel: 0,
  },
  {
    name: 'Пудожский район',
    dumpsCount: 22,
    pollutionLevel: 0,
  },
  {
    name: 'Сегежский район',
    dumpsCount: 0,
    pollutionLevel: 0,
  },
  {
    name: 'Сортавальский район',
    dumpsCount: 0,
    pollutionLevel: 0,
  },
  {
    name: 'Суоярвский район',
    dumpsCount: 0,
    pollutionLevel: 0,
  },
  {
    name: 'Петрозаводский городской округ',
    dumpsCount: 0,
    pollutionLevel: 0,
  },
  {
    name: 'Костомукшский городской округ',
    dumpsCount: 0,
    pollutionLevel: 0,
  }
];

(async () => {

  const result = []
  for (const a of areas) {
    const u = url.replace('Q', encodeURI(a.name));
    const { data } = await axios.get(u);
    if (!data) {
      console.log(u);
      continue;
    }
    result.push({
      ...a,
      polygon: data[0].geojson.coordinates[0].map(p => p.reverse())
    });
  }
  fs.writeFileSync('./static/areas.json', JSON.stringify(result));

})()
