import { City } from './../models/city.model'
import { HttpClient } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private citiesSignal = signal<City[]>([])

  constructor(private http: HttpClient) {}

  public get cities() {
    return this.citiesSignal
  }

  public async loadCities(): Promise<void> {
    try {
      console.log('Chargement des villes...')
      const cities = await firstValueFrom(
        this.http.get<City[]>('./data/cities.json'),
      )
      this.citiesSignal.set(cities)
    } catch (error) {
      console.error('Erreur lors du chargement des villes :', error)
    }
  }

  public deleteCity(id: number): void {
    this.citiesSignal.update(cities => cities.filter(city => city.id !== id))
  }

  public addCity(city: City): void {
    this.citiesSignal.update(cities => [...cities, city])
  }

  public updateCity(city: City): void {
    this.citiesSignal.update(cities =>
      cities.map(currentCity =>
        currentCity === city ? { ...currentCity, ...city } : currentCity,
      ),
    )
  }
}
