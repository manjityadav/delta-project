
    var map = L.map('map').setView([17.36, 78.47], 5); // Default India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);
    
   
    var marker;
       let data=  coordinates;
    
      if (data) {
        let lat = data.lat;
        let lon = data.lon;

        if (marker) map.removeLayer(marker);

        marker = L.marker([lat, lon]).addTo(map)
          .bindPopup(`📍 ${place}`)
          .openPopup();

        map.setView([lat, lon], 12);
      } else {
        alert("Place not found!");
      }
   
  