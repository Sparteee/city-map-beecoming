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
  public isEdit = false

  /* Input and Output decorators */
  @Input() city: City | null = null
  @Output() delete = new EventEmitter<number>()
  @Output() update = new EventEmitter<City>()

  /* Function to toggle the edit modal */
  public toggleEdit(): void {
    this.isEdit = !this.isEdit
  }

  /* Function to emit the updated city */

  public updateCity(): void {
    this.toggleEdit()
    this.update.emit(this.city as City)
  }

  /* Function to emit the deleted city */

  public deleteCity(): void {
    this.delete.emit(this.city?.id)
  }
}
