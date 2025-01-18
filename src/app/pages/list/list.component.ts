import { CommonModule } from '@angular/common'
import { CityService } from './../../services/city.service'
import { Component, effect } from '@angular/core'
import { City } from '../../models/city.model'
import { ListItemComponent } from '../../components/list-item/list-item.component'
import { FormsModule } from '@angular/forms'
import { ModalComponent } from '../../components/modal/modal.component'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, ListItemComponent, FormsModule, ModalComponent],
})
export class ListComponent {
  /* Initialize the newCity object */
  public isModalOpen: boolean = false
  public isEdit: boolean = false
  public city: City = {
    id: 0,
    name: '',
    country: '',
    population: 0,
    lat: 0,
    lng: 0,
  }
  public cities: City[] = [] // Initialize the cities array

  constructor(private cityService: CityService) {
    effect(() => {
      this.cities = this.cityService.cities() // Get the cities from the service
    })
  }

  /* Open the modal for add */

  public openModalForAdd(): void {
    this.isEdit = false
    this.city = {
      // Reset the city object for sure to be empty even if the modal used for edit before
      id: 0,
      name: '',
      country: '',
      population: 0,
      lat: 0,
      lng: 0,
    }
    this.isModalOpen = true
  }

  /* Open the modal for edit */

  public openModalForEdit(editCity: City): void {
    this.isEdit = true
    this.city = { ...editCity }
    this.isModalOpen = true
  }

  /* Handle the modal close event */

  public handleModalClose(): void {
    this.isModalOpen = false
  }

  /* Handle the save event and add or update the city */

  public handleSave(saveCity: City): void {
    if (this.isEdit) {
      this.cityService.updateCity(saveCity)
    } else {
      saveCity.id = this.cities.length + 1
      this.cityService.addCity(saveCity)
    }
    this.isModalOpen = false
  }

  /* Function get the id of the city to delete who are EventEmitter */

  public deleteCity(id: number): void {
    this.cityService.deleteCity(id)
  }
}
