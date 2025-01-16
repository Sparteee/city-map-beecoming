import { CommonModule } from '@angular/common'
import { CityService } from './../../services/city.service'
import { Component, effect } from '@angular/core'
import { City } from '../../models/city.model'
import { ListItemComponent } from '../../components/list-item/list-item.component'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, ListItemComponent, FormsModule],
})
export class ListComponent {
  /* Initialize the newCity object */
  public newCity: City = {
    id: 0,
    name: '',
    country: '',
    population: 0,
    lat: 0,
    lng: 0,
  }

  public isAdd = false
  public cities: City[] = [] // Initialize the cities array

  constructor(private cityService: CityService) {
    effect(() => {
      this.cities = this.cityService.cities() // Get the cities from the service and put them in the cities array
    })
  }

  /* Function to toggle the add modal */

  public toggleAdd(): void {
    this.isAdd = !this.isAdd
  }

  /* Function to add a city */

  public addCity(): void {
    this.newCity.id = this.cities.length + 1
    this.cityService.addCity(this.newCity)
    this.newCity = {
      id: 0,
      name: '',
      country: '',
      population: 0,
      lat: 0,
      lng: 0,
    }
    this.toggleAdd()
  }

  /* Function get the id of the city to delete who are EventEmitter */

  public deleteCity(id: number): void {
    this.cityService.deleteCity(id)
  }
}
