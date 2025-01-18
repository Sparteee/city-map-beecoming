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

  // Getter for the cities signal
  public get cities() {
    return this.citiesSignal
  }

  /** 
    Function to load the cities who are in the data/cities.json file 
    with the HttpClient service
  */

  public async loadCities(): Promise<void> {
    try {
      const cities = await firstValueFrom(
        this.http.get<City[]>('./data/cities.json'),
      )
      this.citiesSignal.set(cities)
    } catch (error) {
      console.error('Erreur lors du chargement des villes :', error)
    }
  }

  /* Function to delete a city */

  public deleteCity(id: number): void {
    this.citiesSignal.update(cities => cities.filter(city => city.id !== id))
  }

  /* Function to add a city */

  public addCity(city: City): void {
    this.citiesSignal.update(cities => [...cities, city])
  }

  /* Function to update a city */

  public updateCity(city: City): void {
    this.citiesSignal.update(cities =>
      cities.map(currentCity =>
        currentCity.id === city.id ? { ...currentCity, ...city } : currentCity,
      ),
    )
  }
}
