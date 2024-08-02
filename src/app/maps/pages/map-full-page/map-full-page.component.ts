import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-full-page',
  templateUrl: './map-full-page.component.html',
  styleUrl: './map-full-page.component.css'
})
export class MapFullPageComponent {

  constructor( private placeService: PlacesService ) { }

  get isUserLocationReady() {
    return this.placeService.isUserLocationActive;
  }

}
