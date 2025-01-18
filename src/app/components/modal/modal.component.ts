import { Component, Input, Output, EventEmitter } from '@angular/core'
import { City } from '../../models/city.model'
import { FormsModule } from '@angular/forms' // Add this import
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ModalComponent {
  @Input() isEdit: boolean = false // Input for knowing if the modal is for editing
  @Input() city: City = {
    // Input for the city object
    id: 0,
    name: '',
    country: '',
    population: 0,
    lat: 0,
    lng: 0,
  }
  @Input() isOpen: boolean = false // Input for knowing if the modal is open
  @Output() close = new EventEmitter<void>() // Output for closing the modal
  @Output() save = new EventEmitter<City>() // Output for saving the provided city

  /* Function to send a close modal event */

  public closeModal(): void {
    this.close.emit()
  }

  /* Function to send a save event */

  public submitForm(): void {
    this.save.emit(this.city)
    this.closeModal()
  }
}
