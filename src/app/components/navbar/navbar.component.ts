import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-nav',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class NavbarComponent {
  /* Initialize the isMenuOpen variable */
  public isMenuOpen: boolean = false

  /* Function to toggle the burger menu */

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }
}
