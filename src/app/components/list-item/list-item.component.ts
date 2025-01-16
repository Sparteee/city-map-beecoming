import { CommonModule } from '@angular/common'
import { City } from './../../models/city.model'
import { Component, Input, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ListItemComponent {
  @Input() city: City | null = null
  @Output() delete = new EventEmitter<number>()
  @Output() update = new EventEmitter<City>()

  public isEdit = false

  constructor() {}

  public toggleEdit(): void {
    this.isEdit = !this.isEdit
  }

  public updateCity(): void {
    this.toggleEdit()
    this.update.emit(this.city as City)
  }

  public deleteCity(): void {
    this.delete.emit(this.city?.id)
  }
}
