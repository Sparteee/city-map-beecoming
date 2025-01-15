import { Component, effect, OnInit } from '@angular/core'
import * as L from 'leaflet'
import { City } from '../../models/city.model'
import { CityService } from '../../services/city.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map!: L.Map
  private markersLayer = L.layerGroup()

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.initMap()
    this.cityService.loadCities()
  }

  private initMap(): void {
    this.map = L.map('map').setView([48.8566, 2.3522], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map)
  }
}
