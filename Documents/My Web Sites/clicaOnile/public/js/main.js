var map = L.map('map').setView([-10.779, -349.158], 3);
 const teleUrl = 'http://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'

 L.tileLayer(teleUrl).addTo(map);

map.locate({enableHighAccuracy: true})
map.on('locationfound', e=>{
    console.log(e)
    const coord = [-10, -349.158]
    const marker = L.marker(coord)
    marker.bindPopup('Estou Aqui')
 
    map.addLayer(marker)
})

const marker = L.marker([-10.779, -349.158])
marker.bindPopup('Estou Aqui')

map.addLayer(marker)