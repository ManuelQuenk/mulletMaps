import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DirectionsApiClient extends HttpClient {
  private baseUrl: string =
    "https://api.mapbox.com/directions/v5/mapbox/driving";

  constructor(
    handler: HttpHandler,
    private http: HttpClient,
  ) {
    super(handler);
  }

  // NOT WORKING AT ALL, THE PARAMS ARE NOT BEING SENT

  public override get<T>(url: string) {
    url = this.baseUrl + url;

    const params = new HttpParams()
      .set(
        "access_token",
        "pk.eyJ1IjoibXVsbGV0bWFudSIsImEiOiJjbHZ5YzY5MG8wMzJ6MmpsNndlNWs3bGFuIn0.vznA7uogCYddtQQo3LS65g",
      )
      .set("alternatives", "false")
      .set("geometries", "geojson")
      .set("language", "es")
      .set("overview", "simplified")
      .set("steps", "false");

    return this.http.get<T>(url, { params });
  }
}
