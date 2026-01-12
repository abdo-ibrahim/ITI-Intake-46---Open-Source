let mapContainer = document.getElementById("map");
let loadMapBtn = document.getElementById("loadMapBtn");
let getInfo = document.getElementById("getInfo");
let infoContainer = document.getElementById("info");

loadMapBtn.addEventListener("click", getLocationMap);
getInfo.addEventListener("click", getLocationData);

function getLocationMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showMap, showError);
  } else {
    mapContainer.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getLocationData() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showInfo, showError);
  } else {
    infoContainer.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showMap(position) {
  let location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  let mapOptions = {
    zoom: 17,
    center: location,
  };

  let map = new google.maps.Map(mapContainer, mapOptions);

  new google.maps.Marker({
    position: location,
    map: map,
    title: "Your Location",
  });
}

function showInfo(position) {
  infoContainer.innerHTML = `
    <p>Latitude: ${position.coords.latitude}</p>
    <p>Longitude: ${position.coords.longitude}</p>
    <p>Accuracy: ${position.coords.accuracy} meters</p>
    <p>Timestamp: ${new Date(position.timestamp).toLocaleString()}</p>
  `;
}

function showError(error) {
  alert("Unable to retrieve your location");
}
