import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken = 'pk.eyJ1IjoibXVsbGV0bWFudSIsImEiOiJjbHZ5YzY5MG8wMzJ6MmpsNndlNWs3bGFuIn0.vznA7uogCYddtQQo3LS65g';

if (!navigator.geolocation) {
  alert('Error al conseguir la geolocalizacion!')
  throw new Error('Error al conseguir la geolocalizacion!')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
