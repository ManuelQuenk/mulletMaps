import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapFullPageComponent } from './pages/map-full-page/map-full-page.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';



@NgModule({
  declarations: [
    MapFullPageComponent,
    MapViewComponent,
    LoadingComponent,
    SearchbarComponent,
    SearchResultsComponent,
    AngularLogoComponent,
    BtnMyLocationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapFullPageComponent,
  ]
})
export class MapsModule { }
