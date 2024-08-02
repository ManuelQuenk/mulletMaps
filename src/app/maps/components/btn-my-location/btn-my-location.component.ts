import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {


  constructor(
    private pService: PlacesService,
    private mService: MapService,
  ) { }

  goToMyLocation() {
    if (!this.pService.isUserLocationActive) throw Error('No se pudo encontrar la localizacion');
    if (!this.mService.isMapReady) throw Error('No se pudo encontrar el mapa');

    this.mService.flyTo(this.pService.userLocation!);
  }

}
