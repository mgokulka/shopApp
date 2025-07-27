import { Component, OnInit, signal } from '@angular/core';
import { Dashboard } from './components/dashboard/dashboard';
import { getApps, initializeApp } from '@angular/fire/app';
import { environment } from '../../environment';
@Component({
  selector: 'app-root',
  imports: [Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  ngOnInit() {
    initializeApp(environment.firebase);
    console.log('Firebase apps loaded:', getApps());
    
  }
}
