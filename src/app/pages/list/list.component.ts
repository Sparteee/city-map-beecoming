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
  public cities: City[] = []

  constructor(private cityService: CityService) {
    effect(() => {
      this.cities = this.cityService.cities()
    })
  }

  openModalForAdd() {
    this.isEdit = false
    this.city = {
      id: 0,
      name: '',
      country: '',
      population: 0,
      lat: 0,
      lng: 0,
    }
    this.isModalOpen = true
  }

  openModalForEdit(editCity: City) {
    this.isEdit = true
    this.city = { ...editCity }
    this.isModalOpen = true
  }

  handleModalClose() {
    this.isModalOpen = false
  }

  handleSave(city: City) {
    if (this.isEdit) {
      console.log('update city')
      this.cityService.updateCity(city)
    } else {
      city.id = this.cities.length + 1
      this.cityService.addCity(city)
    }
    this.isModalOpen = false
  }

  /* Function get the id of the city to delete who are EventEmitter */

  public deleteCity(id: number): void {
    this.cityService.deleteCity(id)
  }
}
