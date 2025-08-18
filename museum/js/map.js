// mapboxgl.accessToken = 'pk.eyJ1IjoiZGlyZm9tIiwiYSI6ImNtZHU5bHBwbTBna28ybHF3c2VkdXJydnoifQ.BUgn3JrFvBlVltdfVfX-5Q';
//   const map = new mapboxgl.Map({
//       container: 'map',
//       // style: 'mapbox://styles/mapbox/light-v11',
//       style: 'mapbox://styles/dirfom/cmdubre7d00hn01qs8zb83afp',
//       center: [2.3364, 48.86091],
//       zoom: 16
//   });
//   const markers = [
//     [2.3364, 48.86091],
//     [2.3333, 48.8602],
//     [2.3397, 48.8607],
//     [2.3330, 48.8619],
//     [2.3365, 48.8625]
//   ];
//   markers.forEach((coord, index) => {
//     new mapboxgl.Marker({
//       color: index === 0 ? "#171717" : "#757575"
//     })
//     .setLngLat(coord)
//     .addTo(map);
//   });
//   map.on('load', () => {
//     map.setPaintProperty('water', 'fill-color', '#C6D0D2');
//     map.setPaintProperty('land', 'background-color', '#F8F8F6');
//     map.setPaintProperty('building', 'fill-color', '#EAEAE8');
    
//   });
//   const nav = new mapboxgl.NavigationControl({
//     visualizePitch: true
//   });
//   map.addControl(nav, 'top-right');

var map = L.map('map').setView([48.86091, 2.3364], 17);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
  var marker1 = L.marker([48.86091, 2.3364], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
  var marker2 = L.marker([48.8602, 2.3333]).addTo(map);
  var marker3 = L.marker([48.8607, 2.3397]).addTo(map);
  var marker4 = L.marker([48.8619, 2.3330]).addTo(map);
  var marker5 = L.marker([48.8625, 2.3365]).addTo(map);
