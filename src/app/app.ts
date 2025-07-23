import { Component, signal } from '@angular/core';
import { Dashboard } from './components/dashboard/dashboard';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environment';
@Component({
  selector: 'app-root',
  imports: [Dashboard, ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
}
