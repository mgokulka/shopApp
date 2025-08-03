import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimengComponentsModule } from '../../shared/primeng-components-module';
import { AuthService } from '../../shared/auth-service';
import { Router } from '@angular/router';
import { CONST_ROUTES } from './constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [PrimengComponentsModule],
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {
  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter(false);
  ngOnInit(): void {
    console.log('navigator.onLine:', navigator.onLine);
  }

  loginForm: FormGroup;
  isSignUp = false;
  // private _authService = inject(AuthService);
  private _router = inject(Router);
  constructor(private fb: FormBuilder, public _authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['abc@abc.com', [Validators.required, Validators.email]],
      password: ['Pass@1234567', Validators.required],
      confirmPassword: [''],
    });
  }

  toggleSignUp(): void {
    this.isSignUp = !this.isSignUp;
    const confirmPassword = this.loginForm.get('confirmPassword');

    if (this.isSignUp) {
      confirmPassword?.setValidators(Validators.required);
    } else {
      confirmPassword?.clearValidators();
    }

    confirmPassword?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    if (this.isSignUp) {
      this._authService
        .signup(email, password)
        .then(() => {
          this._router.navigate([CONST_ROUTES.createItem]);
        })
        .catch((error) => {
          console.error('Signup error:', error);
        });

      console.log('Signup:', this.loginForm.value);
    } else {
      this._authService
        .login(email, password)
        .then(() => {
          // this._router.navigate([CONST_ROUTES.createItem]);
          this.isLoggedIn.emit(true);
        })

        .catch((error) => {
          console.error('Login error:', error);
        });

      console.log('Login:', this.loginForm.value);
    }
  }

  onReset(): void {
    this.loginForm.reset();
    this.isSignUp = false;
  }
}
