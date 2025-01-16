import { CommonModule } from '@angular/common'
import { CityService } from './../../services/city.service'
import { Component, effect, OnInit } from '@angular/core'
import { City } from '../../models/city.model'
import { ListItemComponent } from '../../components/list-item/list-item.component'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, ListItemComponent],
})
export class ListComponent implements OnInit {
  public cities: City[] = []
  constructor(private cityService: CityService) {
    effect(() => {
      this.cities = this.cityService.cities()
    })
  }

  ngOnInit(): void {
    this.cityService.loadCities()
  }

  public deleteCity(id: number): void {
    this.cityService.deleteCity(id)
  }
}
