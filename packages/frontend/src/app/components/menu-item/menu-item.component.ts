import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { Router, RouterModule } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MenuItem } from 'src/app/interfaces/menu-item'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { MatBadgeModule } from '@angular/material/badge'

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule, RouterModule, FontAwesomeModule, MatButtonModule, MatListModule, MatBadgeModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  chevronUp = faChevronUp
  chevronDown = faChevronDown

  @Input() item!: MenuItem
  expanded = false

  constructor(private router: Router) {}

  doCommand() {
    // TODO href and routerlink in the same page, a way of not doing it this dirty way
    // this is BAD for accesibility you know
    // the other option was an ngif and displaying it depending on this. not cool!
    if (this.item.url) {
      window.open(this.item.url, '_blank')
    }
    if (this.item.routerLink) {
      this.router.navigate([this.item.routerLink])
    }
    if (this.item.command) {
      this.item.command()
    }
  }

  handleKey(event: KeyboardEvent) {
    if (event.key !== 'Enter') return

    // Run the associated event
    if (this.item.items) {
      this.expanded = !this.expanded
    } else {
      this.doCommand()
    }
  }
}
