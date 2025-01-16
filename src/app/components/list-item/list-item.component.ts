import { City } from './../../models/city.model'
import { Component, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() city: City | null = null
  @Output() delete = new EventEmitter<number>()

  constructor() {}

  public deleteCity(): void {
    this.delete.emit(this.city?.id)
  }
}
