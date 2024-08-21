import { Injectable } from "@angular/core";

import {
  AnySourceData,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from "mapbox-gl";

import { DirectionsApiClient } from "../api";
import { DirectionsResponse } from "../interfaces";
import { Feature } from "../interfaces/PlacesResponse";
import { Route } from "../interfaces/directions";

@Injectable({
  providedIn: "root",
})
export class MapService {

  private map?: Map;
  public markers?: Marker[];

  get isMapReady() {
    return !!this.map;
  }

  constructor(private directionsApi: DirectionsApiClient) {}

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error("Hubo un error con el mapa!");

    this.map?.flyTo({
      center: coords,
      zoom: 13,
    });
  }

  public createMarkersFromPlaces(
    places: Feature[],
    userLocation: [number, number],
  ) {
    if (!this.map) throw Error("Error al conseguir el mapa");

    this.markers?.forEach((marker) => marker.remove());

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.geometry.coordinates;
      const popup = new Popup()
        .setLngLat([lng, lat])
        .setHTML(
          `
        <h1>${place.properties.name}</h1>
        <p>${place.properties.full_address}</p>
        `,
        )
        .addTo(this.map);

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;

    if (places.length === 0) return;
    const bounds = new LngLatBounds();

    newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding: 200,
    });
  }
  public getRouteBetweenPlaces(start: [number, number], end: [number, number]) {
    this.directionsApi
      .get<DirectionsResponse>(`/${start.join(",")};${end.join(",")}`)
      .subscribe((res) => this.drawPolylines(res.routes[0]));
  }

  private drawPolylines(route: Route) {
    // shows in console the distance in kilometers and time needed in minutes
    console.log("kms: ", route.distance / 1000, "time: ", route.duration / 60);

    // Adapts the map zoom to fit the start, finish and route
    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => bounds.extend([lng, lat]));

    if (!this.map) throw Error("Error al inicializar el mapa!");

    this.map.fitBounds(bounds, {
      padding: 200,
    });

    // Polyline
    // Configure source info
    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };
    // Limpiar rutas anteriores
    if (this.map.getLayer("RouteString")) {
      this.map.removeLayer("RouteString");
      this.map.removeSource("RouteString");
    }

    // add source to map
    this.map.addSource("RouteString", sourceData);
    // Configure look of the polyline and assign it to source
    this.map.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 3,
      },
    });
  }
}

