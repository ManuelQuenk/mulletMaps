import { Component } from '@angular/core';
import { PlacesService } from '../../services';
import { Feature } from '../../interfaces/PlacesResponse';

@Component({
  selector: 'map-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  private debounceTimer?: NodeJS.Timeout;

  constructor(private placesService: PlacesService) { }

  searchPlacesByQuery( query:string = '' ) {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesByQuery(query)
    }, 350);
  }
}
