import { Component, inject } from "@angular/core";
import { MapService, PlacesService } from "../../services";
import { Feature } from "../../interfaces/PlacesResponse";

@Component({
  selector: "map-search-results",
  templateUrl: "./search-results.component.html",
  styleUrl: "./search-results.component.css",
})
export class SearchResultsComponent {
  private placesService = inject(PlacesService);
  private mapService = inject(MapService);

  public selectedId: string = "";

  get isLoadingPlaces() {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  public flyTo(place: Feature) {
    this.selectedId = place.id;

    const [lng, lat] = place.geometry.coordinates;

    this.mapService.flyTo([lng, lat]);
  }

  public navigateToPlace(place: Feature) {
    if (!this.placesService.userLocation)
      throw Error("Could not obtain the user location.");

    const start = this.placesService.userLocation;
    const end = place.geometry.coordinates as [number, number];

    this.mapService.getRouteBetweenPlaces(end, start);
    const query = "";
    this.placesService.getPlacesByQuery(query);
  }
}
