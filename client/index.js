const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker.js');

mapboxgl.accessToken = 'pk.eyJ1Ijoic3oxMTE3IiwiYSI6ImNrYzBucHp2ZTEzMmcyc3BqaGM2djMxbDYifQ.XHcH-avolUHVF8udNCYhYA';

const fullstackCoords = [ -74.009, 40.705 ]; // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
	container : 'map',
	center    : fullstackCoords, // FullStack coordinates
	zoom      : 12, // starting zoom
	style     : 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
});

const marker = buildMarker('activities', fullstackCoords);
marker.addTo(map);

const loadPage = async () => {
	const hotelChoices = document.getElementById('hotels-choices');
	const restuarantChoices = document.getElementById('restaurants-choices');
	const activityChoices = document.getElementById('activities-choices');

	const result = await fetch('/api');
	const data = await result.json();
	for (let i = 0; i < data.hotels.length; i++) {
		hotelChoices.appendChild(data.hotels[i].name);
	}
};

loadPage();
