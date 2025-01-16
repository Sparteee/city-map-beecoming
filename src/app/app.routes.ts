import { Routes } from '@angular/router'
import { MapComponent } from './components/map/map.component'
import { ListComponent } from './pages/list/list.component'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full',
  },
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
]
