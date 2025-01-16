import {
  afterRender,
  Component,
  effect,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core'
import * as L from 'leaflet'
import { Map } from 'leaflet'
import { City } from '../../models/city.model'
import { CityService } from '../../services/city.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef<HTMLDivElement> | null = null
  private map: Map | null = null
  private markersLayer = L.layerGroup()

  private markerCustomIcon = L.icon({
    iconUrl: 'assets/icons/marker.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  private flagCustomIcon = L.icon({
    iconUrl: 'assets/icons/flag.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  constructor(private cityService: CityService) {
    afterRender(() => {
      if (this.map) {
        this.map.whenReady(() => {
          setTimeout(() => {
            this.map?.invalidateSize()
          }, 150)
        })
      }
    })

    effect(() => {
      const cities = this.cityService.cities()
      this.addMarkers(cities)
    })
  }
  ngOnInit(): void {
    this.initMap()
  }

  private initMap(): void {
    this.map = L.map('map').setView([48.8566, 2.3522], 4)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map,
    )
  }

  private addMarkers(cities: City[]): void {
    this.markersLayer.clearLayers()

    cities.forEach(city => {
      if (!this.map) {
        return
      }
      const marker = L.marker([city.lat, city.lng], {
        icon: this.markerCustomIcon,
      }).addTo(this.map)

      marker.bindPopup(
        `
        <div style="font-size: 1.4rem; text-align: center;">
          <strong style="font-size: 1.6rem; color: #007BFF;">${
            city.name
          }</strong><br>
          <span>${city.country}</span><br>
          <strong>Population:</strong> ${city.population.toLocaleString(
            'fr-FR',
          )}
        </div>
        `,
      )
    })
  }

  public locateUser(): void {
    this.map?.locate({ setView: true })
    this.map?.on('locationfound', (e: L.LocationEvent) => {
      const radius = e.accuracy / 2
      L.marker(e.latlng, { icon: this.flagCustomIcon })
        .addTo(this.map!)
        .bindPopup(
          '<strong style="font-size: 1.6rem; color: #FF0000;" >Vous êtes ici</strong>',
        )
        .openPopup()
      L.circleMarker(e.latlng, { radius }).addTo(this.map!)
    })

    this.map?.on('locationerror', (e: L.ErrorEvent) => {
      console.error(e.message)
    })
  }
}
