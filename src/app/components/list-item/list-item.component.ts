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
  /* Input and Output decorators */
  @Input() city: City | null = null
  @Output() delete = new EventEmitter<number>()
  @Output() edit = new EventEmitter<City>()

  /* Function to toggle the edit modal */
  /* Function to emit the updated city */

  public openEditModal(): void {
    if (this.city) {
      this.edit.emit(this.city)
    }
  }

  /* Function to emit the deleted city */

  public deleteCity(): void {
    this.delete.emit(this.city?.id)
  }
}
