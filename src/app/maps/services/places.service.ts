import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/PlacesResponse';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public userLocation: [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationActive() {
    return !!this.userLocation;
  }

  constructor(
    private http: HttpClient,
    private mapService: MapService,
  ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.userLocation = [coords.longitude, coords.latitude];
        resolve(this.userLocation);
      }),
        (err: Error) => {
          console.log(err);
          reject();
        };
    });
  }

  getPlacesByQuery(query: string) {

    if (query.length === 0) {
      this.places = []
      this.isLoadingPlaces = false
      return
    }

    this.isLoadingPlaces = true;

    return this.http
      .get<PlacesResponse>(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&proximity=${this.userLocation}&language=es&access_token=pk.eyJ1IjoibXVsbGV0bWFudSIsImEiOiJjbHVzaWp3Z3EwajE5Mmpua3Y1Nm00NWIzIn0.BXH02qD27MpXTxHmKUcGfQ`
      )
      .subscribe((res) => {
        if ( !this.userLocation ) throw Error('No pudimos obtener tu localizacion')

        this.isLoadingPlaces = false;
        this.places = res.features;

        this.mapService.createMarkersFromPlaces(this.places, this.userLocation)
      });
  }

  public hideSearchResults() {
    this.places = [];
  }
}
