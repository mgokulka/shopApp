import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CONST_ROUTES } from '../components/login/constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private _router = inject(Router);

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this._auth, email, password);
    this._router.navigate([CONST_ROUTES.createItem]);
  }

  async signup(email: string, password: string) {
    await createUserWithEmailAndPassword(this._auth, email, password);
    this._router.navigate([CONST_ROUTES.createItem]);
  }

  async logout() {
    await signOut(this._auth);
    this._router.navigate([CONST_ROUTES.login]);
  }

  async forgertPassword(email: string) {
    await sendPasswordResetEmail(this._auth, email);
  }
}
