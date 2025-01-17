import { Component, Input, Output, EventEmitter } from '@angular/core'
import { City } from '../../models/city.model'
import { FormsModule } from '@angular/forms' // Add this import
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ModalComponent {
  @Input() isEdit: boolean = false
  @Input() city: City = {
    id: 0,
    name: '',
    country: '',
    population: 0,
    lat: 0,
    lng: 0,
  }
  @Input() isOpen: boolean = false
  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<City>()

  closeModal() {
    this.close.emit()
  }

  submitForm() {
    this.save.emit(this.city)
    this.closeModal()
  }
}
