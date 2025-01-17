import {
  afterRender,
  Component,
  effect,
  ElementRef,
  OnInit,
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
  /* Get the HTML element with the id 'map' */
  @ViewChild('map') mapElement: ElementRef<HTMLDivElement> | null = null

  /* Initialize the map and markersLayer */
  private map: Map | null = null
  private markersLayer = L.layerGroup()

  /* Declare custom icons */
  private markerCustomIcon = L.icon({
    iconUrl: 'assets/icons/marker.svg',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41],
    popupAnchor: [1, -34], // Popup position
  })

  private flagCustomIcon = L.icon({
    iconUrl: 'assets/icons/flag.svg',
    iconSize: [35, 51], // size of the icon
    iconAnchor: [12, 41],
    popupAnchor: [1, -34], // Popup position
  })

  public isLocating: boolean = false
  private userMarker: L.Marker | null = null
  private radiusCircle: L.CircleMarker | null = null

  constructor(private cityService: CityService) {
    afterRender(() => {
      if (this.map) {
        this.map.whenReady(() => {
          // Wait for the map to be ready before invalidating the size
          setTimeout(() => {
            this.map?.invalidateSize()
          }, 150) // 150ms
        })
      }
    })

    effect(() => {
      const cities = this.cityService.cities() // Get the cities from the service
      this.addMarkers(cities)
    })
  }

  ngOnInit(): void {
    this.initMap()
  }

  /* Function to initialize the map */

  private initMap(): void {
    this.map = L.map('map', {
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
      maxBoundsViscosity: 1.0,
    }).setView([48.8566, 2.3522], 4) // Set the map view to Paris
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 3,
      noWrap: true,
    }).addTo(this.map)
  }

  /* Function to add markers to the map */
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
        // Add a popup to the marker with the city information
        `
        <div style="font-size: 1rem; text-align: center;">
          <strong style="font-size: 1rem; color: #007BFF;">${
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

  /* Function to locate the user on the map with geolocation */

  public locateUser(): void {
    if (!this.isLocating) {
      this.map?.locate({ setView: true })
      this.map?.on('locationfound', (e: L.LocationEvent) => {
        const radius = e.accuracy / 2
        this.userMarker = L.marker(e.latlng, { icon: this.flagCustomIcon })
          .addTo(this.map!)
          .bindPopup(
            '<strong style="font-size: 1rem; color: #FF0000;" >Vous êtes ici !</strong>',
          )
          .openPopup()
        this.radiusCircle = L.circleMarker(e.latlng, { radius }).addTo(
          this.map!,
        )
        this.isLocating = true
      })

      this.map?.on('locationerror', (e: L.ErrorEvent) => {
        console.error(e.message)
        this.isLocating = false
      })
    }
  }

  /* Function to stop locating the user and remove the marker and circle */

  public stopLocating(): void {
    this.map?.stopLocate()
    this.userMarker?.remove()
    this.radiusCircle?.remove()
    this.map?.zoomOut(this.map.getZoom() - 4)
    this.isLocating = false
  }
}
