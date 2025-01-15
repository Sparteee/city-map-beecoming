import { City } from './../models/city.model'
import { HttpClient } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private citiesSignal = signal<City[]>([])

  constructor(private http: HttpClient) {}

  public get cities() {
    return this.citiesSignal
  }

  public loadCities(): void {
    this.http.get<City[]>('./data/cities.json').subscribe({
      next: data => {
        console.log('Chargement des villes :', data)
        this.citiesSignal.set(data)
      },
      error: error => {
        console.error('Erreur lors du chargement des villes :', error)
      },
    })
  }
}
