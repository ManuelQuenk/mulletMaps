import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';

import { MapService, PlacesService } from '../../services';

import { Map, Popup, Marker } from 'mapbox-gl'

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit{

  private placesService = inject(PlacesService);
  private mapService = inject(MapService)

  @ViewChild('mapDiv') mapDivContainer!: ElementRef;

  ngAfterViewInit(): void {

    if ( !this.placesService.userLocation ) throw Error('No se pudo conseguir la localizacion! :(');

    const map = new Map({
        container: this.mapDivContainer.nativeElement, // Container ID
        style: 'mapbox://styles/mapbox/streets-v12', // Style url
        center: this.placesService.userLocation, //Starting point (Latitude and longitude)
        zoom: 13, // Starting zoom when map is loaded
      });

    const popup = new Popup()
     .setHTML(`
     <h6>'Usted esta aqui'</h6>
     <span>En esta localizacion</span>
     `)


    const marker = new Marker({ color: 'red' })
     .setLngLat(this.placesService.userLocation)
     .setPopup(popup)
     .addTo(map)

    this.mapService.setMap(map)

  }
}


