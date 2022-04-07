const fs = require('fs');
const axios = require('axios');

const url = "https://nominatim.openstreetmap.org/search.php?q=Q&polygon_geojson=1&format=json";
const areas = ['Беломорский район','Калевальский район','Кемский район','Кондопожский район','Лахденпохский район','Лоухский район','Медвежьегорский район','Муезерский район','Олонецкий район','Питкярантский район','Прионежский район','Пряжинский район','Пудожский район','Сегежский район','Сортавальский район','Петрозаводский городской округ','Костомукшский городской округ'];

(async() => {

  const result = []
  for (const a of areas) {
    const u = url.replace('Q', encodeURI(a));
    const { data } = await axios.get(u);
    if (!data) {
      console.log(u);
      continue;
    }
    result.push({
      name: a,
      polygon: data[0].geojson.coordinates[0].map(p => p.reverse())
    });
  }
  fs.writeFileSync('areas.json', JSON.stringify(result));

})()
